import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { useHighestZindex } from './useHighestZindex';

export default function ColumnSelectionModal({ isOpen, toggle, columnsConfig, visibleColumns, setVisibleColumns }) {
  const highestZ = useHighestZindex(isOpen);

  const handleParentChange = (parentKey) => {
    const newVisibleColumns = { ...visibleColumns };
    const allChildrenChecked = Object.keys(columnsConfig[parentKey].children).every(
      (childKey) => visibleColumns[parentKey]?.[childKey]
    );
    const newChildrenState = !allChildrenChecked;
    newVisibleColumns[parentKey] = { ...newVisibleColumns[parentKey] };
    for (const childKey in columnsConfig[parentKey].children) {
      newVisibleColumns[parentKey][childKey] = newChildrenState;
    }
    setVisibleColumns(newVisibleColumns);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" style={{ zIndex: highestZ }}>
      <ModalHeader toggle={toggle}>Select Columns</ModalHeader>
      <ModalBody>
        {columnsConfig && Object.entries(columnsConfig).map(([parentKey, parentConfig]) => (
          <div key={parentKey}>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  checked={Object.values(visibleColumns[parentKey] || {}).every(Boolean)}
                  onChange={() => handleParentChange(parentKey)}
                />{' '}
                {parentConfig.label}
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              {parentConfig.children && Object.entries(parentConfig.children).map(([childKey, childConfig]) => (
                <FormGroup check key={childKey}>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={visibleColumns[parentKey]?.[childKey] || false}
                      onChange={() => handleChildChange(parentKey, childKey)}
                    />{' '}
                    {childConfig.label}
                  </Label>
                </FormGroup>
              ))}
            </div>
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}