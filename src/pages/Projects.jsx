// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react'
import NewProjectModal from '../components/NewProjectModal'
import SearchSection from '../components/ProjectsSections/SearchSection'
import ResultSection from '../components/ProjectsSections/ResultSection'

// The main component for the Projects page.
export default function Projects() {
  // State for managing filter inputs.
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [models, setModels] = useState('')
  const [manager, setManager] = useState('')
  const [statuses, setStatuses] = useState({
    all: true, draft: false, active: false, onhold: false, completed: false
  })

  // State for the new/edit project modal.
  const [showNewModal, setShowNewModal] = useState(false)
  // State to track the index of the project being edited.
  const [editingIndex, setEditingIndex] = useState(null)
  // State to hold the search results. Initialized to null to prevent initial rendering of results.
  // State to hold the search results. Initialized to an empty array so the
  // result section (table header) can be rendered on initial load while
  // showing no data rows.
  const [results, setResults] = useState([])
  const [projectsData, setProjectsData] = useState([]);

  // State for pagination.
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10 // Number of items per page.

  useEffect(() => {
    const projectUrl = `${import.meta.env.BASE_URL}projects.json`;
    fetch(projectUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProjectsData(data);
      })
      .catch(error => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Resets all filters to their default values and clears the search results.
  function clearFilters() {
    setCode(''); setName(''); setModels('')
    setManager('')
    setStatuses({ all: true, draft: false, active: false, onhold: false, completed: false })
    setResults([]) // Clear results
    setCurrentPage(1)
  }

  // Handles the search functionality based on the current filter states.
  function handleSearch() {
    // Perform search and update results. We don't gate rendering on a
    // "hasSearched" flag anymore; the results array controls what is
    // displayed. An empty array will show the table header with no rows.
    // Check if any filters have been applied.
    const noFilters = !code && !name && !models && !manager && statuses.all;

    // Filter the projectsData based on the input fields.
    let filtered = projectsData.filter(p =>
      (!code || p.code?.toLowerCase().includes(code.toLowerCase())) &&
      (!name || p.name?.toLowerCase().includes(name.toLowerCase())) &&
      (!models || (Array.isArray(p.models)
        ? p.models.join(', ').toLowerCase().includes(models.toLowerCase())
        : (p.models || '').toLowerCase().includes(models.toLowerCase()))) &&
      (!manager || p.manager?.toLowerCase().includes(manager.toLowerCase()))
    );

    // Apply status filters if 'all' is not selected.
    if (!statuses.all) {
      const statusKeys = [];
      if (statuses.draft) statusKeys.push('Draft');
      if (statuses.active) statusKeys.push('Active');
      if (statuses.onhold) statusKeys.push('On Hold');
      if (statuses.completed) statusKeys.push('Completed');
      if (statusKeys.length > 0) {
        filtered = filtered.filter(p => statusKeys.includes(p.status));
      }
    }

    // If no filters are applied, show the latest data by reversing the array.
    if (noFilters) {
      setResults([...filtered].reverse());
    } else {
      setResults(filtered);
    }
    setCurrentPage(1); // Reset to the first page after a new search.
  }

  // Opens the modal for creating a new project.
  function handleOpenNew() {
    setEditingIndex(null) // Ensure we are not in edit mode.
    setShowNewModal(true)
  }

  // Closes the new/edit project modal.
  function handleCloseNew() {
    setShowNewModal(false)
  }

  // Saves a new project or updates an existing one.
  function handleSaveNew(payload) {
    // If editingIndex is not null, update the existing project.
    if (editingIndex !== null) {
      setResults(prev => prev.map((r, i) => {
        if (i !== editingIndex) return r;
        return {
          ...r, // Keep existing fields
          project_code: payload.code,
          project_name: payload.name,
          project_manager: payload.manager,
          project_status: payload.status,
          description: payload.description,
          note: payload.note,
          models: payload.models,
        };
      }));
    } else {
      // Otherwise, add the new project to the beginning of the results.
      const newRow = {
        project_code: payload.code || `CFC-${((results || []).length + 1).toString().padStart(3, '0')}`,
        project_name: payload.name || '(No name)',
        project_manager: payload.manager || '',
        project_status: payload.status || 'Draft',
        description: payload.description,
        note: payload.note,
        models: payload.models,
      };
      setResults(prev => [newRow, ...(prev || [])]);
    }
    setShowNewModal(false); // Close the modal.
    setEditingIndex(null); // Reset editing index.
  }

  // Opens the modal in edit mode for a specific project.
  function handleEdit(index) {
    setEditingIndex(index);
    setShowNewModal(true);
  }

  // Deletes a project from the results.
  function handleDelete(index) {
    setResults(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="container-fluid">
      <div className="card card-outline card-secondary">
        <div className="card-header d-flex align-items-center">
          <h3 className="card-title mb-0"><b>Project List</b></h3>
          {/* Action buttons in the header */}
          <div className="ml-auto">
            <button type="button" className="btn btn-sm btn-success mr-2" onClick={handleOpenNew}>
              <i className="fas fa-plus mr-1"></i> New Project
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary mr-1" title="Upload">
              <i className="fas fa-cloud-upload-alt"></i>
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary" title="Download Template">
              <i className="fas fa-cloud-download-alt"></i>
            </button>
          </div>
        </div>
        {/* Search section component */}
        <SearchSection
          code={code} setCode={setCode}
          name={name} setName={setName}
          models={models} setModels={setModels}
          manager={manager} setManager={setManager}
          statuses={statuses} setStatuses={setStatuses}
          handleSearch={handleSearch}
          clearFilters={clearFilters}
          handleOpenNew={handleOpenNew}
        />
        {/* Result section: render the table header immediately but rows will
            show only when `results` contains items. */}
        <ResultSection
          results={results}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
        />
      </div>
      {/* Modal for creating/editing a project */}
      <NewProjectModal
        visible={showNewModal}
        onClose={handleCloseNew}
        onSave={handleSaveNew}
        initialData={
          editingIndex !== null && results && results[editingIndex]
            ? {
                ...results[editingIndex],
                models: Array.isArray(results[editingIndex].models)
                  ? results[editingIndex].models.map(m =>
                      typeof m === 'string'
                        ? { code: m, name: '', remark: '' }
                        : m
                    )
                  : (results[editingIndex].models || '').split(',').map(m => ({ code: m.trim(), name: '', remark: '' }))
              }
            : null
        }
      />
    </div>
  )
}