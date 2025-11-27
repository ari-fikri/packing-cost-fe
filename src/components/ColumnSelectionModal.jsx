import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const nodes = [
    {
        value: 'main_info',
        label: 'Main Info',
        children: [
            { value: 'destination', label: 'Destination' },
            { value: 'model', label: 'Model' },
            { value: 'impl_period', label: 'Implementation Period' },
            { value: 'cps_no', label: 'CPS No' },
        ],
    },
    {
        value: 'part_info',
        label: 'Part Info',
        children: [
            { value: 'part_no_part', label: 'Part No' },
            { value: 'part_name', label: 'Part Name' },
            { value: 'parent_part', label: 'Parent Part' },
            { value: 'supplier_code', label: 'Supplier Code' },
            { value: 'supplier_name', label: 'Supplier Name' },
            { value: 'part_status', label: 'Part Status' },
            { value: 'dtl_part_status', label: 'Dtl Part Status' },
            { value: 'pack_spec_status', label: 'Pack Spec Status' },
            { value: 'weight_pc', label: 'Weight/Pc' },
            { value: 'qty_box', label: 'Qty/Box' },
        ],
    },
    {
        value: 'pse_info',
        label: 'PSE Info',
        children: [
            {
                value: 'packing_plant',
                label: 'Packing Plant',
                children: [
                    { value: 'packing_plant_current', label: 'Current' },
                    { value: 'packing_plant_next', label: 'Next' },
                ]
            },
            {
                value: 'vanning_plant',
                label: 'Vanning Plant',
                children: [
                    { value: 'vanning_plant_current', label: 'Current' },
                    { value: 'vanning_plant_next', label: 'Next' },
                ]
            },
            {
                value: 'order_pattern',
                label: 'Order Pattern',
                children: [
                    { value: 'order_pattern_current', label: 'Current' },
                    { value: 'order_pattern_next', label: 'Next' },
                ]
            },
            {
                value: 'katashiiki',
                label: 'Katashiiki',
                children: [
                    { value: 'katashiiki_ad', label: 'AD' },
                    { value: 'katashiiki_au', label: 'AU' },
                    { value: 'katashiiki_af', label: 'AF' },
                    { value: 'katashiiki_ax', label: 'AX' },
                ]
            },
            { value: 'importer_line_process', label: 'Importer Line Process' },
            { value: 'case_code', label: 'Case Code' },
            { value: 'box_number', label: 'Box Number' },
            { value: 'renban', label: 'Renban' },
            { value: 'renban_eff', label: 'Renban Eff' },
            {
                value: 'packing_process',
                label: 'Packing Process',
                children: [
                    { value: 'packing_process_boxing', label: 'Boxing' },
                    { value: 'packing_process_stacking', label: 'Stacking' },
                ]
            },
        ],
    },
    {
        value: 'logistic_info',
        label: 'Logistic Info',
        children: [
            { value: 'dock_code', label: 'Dock Code' },
            { value: 'address', label: 'Address' },
            { value: 'process_type', label: 'Process Type' },
        ],
    },
    {
        value: 'images',
        label: 'Images',
        children: [
            { value: 'part_image', label: 'Part' },
            { value: 'packing_image', label: 'Packing' },
            { value: 'outer_image', label: 'Outer' },
            { value: 'qkp_image', label: 'QKP' },
            { value: 'bkp_image', label: 'BKP' },
        ],
    },
    {
        value: 'inner_materials',
        label: 'Inner Materials',
        children: [
            {
                value: 'box',
                label: 'Box',
                children: [
                    { value: 'box_mat_no', label: 'Mat No' },
                    { value: 'box_length', label: 'Length' },
                    { value: 'box_width', label: 'Width' },
                    { value: 'box_height', label: 'Height' },
                    { value: 'box_volume_inner', label: 'Volume Inner' },
                    { value: 'box_volume_outer', label: 'Volume Outer' },
                    { value: 'box_usage', label: 'Usage' },
                    { value: 'box_source', label: 'Source' },
                ]
            },
            ...[...Array(9).keys()].map(i => ({
                value: `outer_${i + 1}`,
                label: `Outer ${i + 1}`,
                children: [
                    { value: `outer_${i + 1}_mat_no`, label: 'Mat No' },
                    { value: `outer_${i + 1}_usage`, label: 'Usage' },
                ]
            }))
        ],
    },
    {
        value: 'outer_materials',
        label: 'Outer Materials',
        children: [
            {
                value: 'module',
                label: 'Module',
                children: [
                    { value: 'module_mat_no', label: 'Mat No' },
                    { value: 'module_length', label: 'Length' },
                    { value: 'module_width', label: 'Width' },
                    { value: 'module_height', label: 'Height' },
                    { value: 'module_volume_inner', label: 'Volume Inner' },
                    { value: 'module_usage', label: 'Usage' },
                ]
            },
        ],
    },
];

const ColumnSelectionModal = ({ isOpen, toggle, checked, onCheckedChange }) => {
    const [expanded, setExpanded] = useState([]);

    const getDescendants = (node, descendants = []) => {
        if (node.children) {
            node.children.forEach(child => {
                descendants.push(child.value);
                getDescendants(child, descendants);
            });
        }
        return descendants;
    };

    const getParent = (value, nodesToSearch) => {
        for (const node of nodesToSearch) {
            if (node.children?.some(child => child.value === value)) {
                return node;
            }
            if (node.children) {
                const parent = getParent(value, node.children);
                if (parent) return parent;
            }
        }
        return null;
    };

    const handleCheck = (node) => {
        let newChecked = [...checked];
        const isChecked = newChecked.includes(node.value);
        const descendants = getDescendants(node);

        if (isChecked) {
            // Uncheck logic: remove the node, its descendants, and all its parents from the checked list
            newChecked = newChecked.filter(item => item !== node.value && !descendants.includes(item));
            let parent = getParent(node.value, nodes);
            while (parent) {
                newChecked = newChecked.filter(item => item !== parent.value);
                parent = getParent(parent.value, nodes);
            }
        } else {
            // Check logic: add the node and its descendants to the checked list
            newChecked.push(node.value);
            if (node.children) {
                newChecked.push(...descendants);
            }
            
            // Update parent status: if all children of a parent are checked, check the parent
            let parent = getParent(node.value, nodes);
            while (parent) {
                const allChildrenChecked = parent.children.every(child =>
                    newChecked.includes(child.value)
                );
                if (allChildrenChecked) {
                    if (!newChecked.includes(parent.value)) {
                        newChecked.push(parent.value);
                    }
                }
                parent = getParent(parent.value, nodes);
            }
        }
        
        onCheckedChange([...new Set(newChecked)]);
    };

    const toggleExpanded = (value) => {
        setExpanded(prev => 
            prev.includes(value) 
                ? prev.filter(item => item !== value)
                : [...prev, value]
        );
    };

    const renderTree = (nodes, level = 0) => {
        return nodes.map(node => (
            <div key={node.value}>
                <div style={{ display: 'flex', alignItems: 'center', paddingLeft: `${level * 20}px` }}>
                    {node.children && (
                        <span 
                            style={{ cursor: 'pointer', marginRight: '5px' }}
                            onClick={() => toggleExpanded(node.value)}
                        >
                            {expanded.includes(node.value) ? '−' : '+'}
                        </span>
                    )}
                    <FormGroup check style={{ margin: 0, marginLeft: !node.children ? '20px' : '0' }}>
                        <Label check>
                            <Input
                                type="checkbox"
                                checked={checked.includes(node.value)}
                                onChange={() => handleCheck(node)}
                            />
                            {' '}
                            {level === 0 ? <strong>{node.label}</strong> : node.label}
                        </Label>
                    </FormGroup>
                </div>
                {node.children && expanded.includes(node.value) && (
                    <div>
                        {renderTree(node.children, level + 1)}
                    </div>
                )}
            </div>
        ));
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} zIndex={9999} size="lg">
            <ModalHeader toggle={toggle}>Column Selection</ModalHeader>
            <ModalBody>
                <div className="row">
                    <div className="col-md-4">
                        {renderTree(nodes.slice(0, 3))}
                    </div>
                    <div className="col-md-4">
                        {renderTree(nodes.slice(3, 5))}
                    </div>
                    <div className="col-md-4">
                        {renderTree(nodes.slice(5))}
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggle}>Apply</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default ColumnSelectionModal;