import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ColumnSelectionModal = ({ isOpen, toggle }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      toggle={toggle} 
      zIndex={9999}
    >
      <ModalHeader toggle={toggle}>Column Selection</ModalHeader>
      <ModalBody>
        <div className="row">
          {/* Main Info */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Main Info</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Destination</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Model</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Part No</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Implementation Period</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> CPS No</Label></FormGroup>
            </div>
          </div>

          {/* Part Info */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Part Info</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Part No</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Part Name</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Parent Part</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Supplier Code</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Supplier Name</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Part Status</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Dtl Part Status</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Pack Spec Status</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Weight/Pc</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Qty/Box</Label></FormGroup>
            </div>
          </div>

          {/* PSE Info */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>PSE Info</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Packing Plant</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Current</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Next</Label></FormGroup>
              </div>
              <FormGroup check><Label check><Input type="checkbox" /> Vanning Plant</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Current</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Next</Label></FormGroup>
              </div>
              <FormGroup check><Label check><Input type="checkbox" /> Order Pattern</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Current</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Next</Label></FormGroup>
              </div>
              <FormGroup check><Label check><Input type="checkbox" /> Katashiiki</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> AD</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> AU</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> AF</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> AX</Label></FormGroup>
              </div>
              <FormGroup check><Label check><Input type="checkbox" /> Importer Line Process</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Case Code</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Box Number</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Renban</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Renban Eff</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Packing Process</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Boxing</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Stacking</Label></FormGroup>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {/* Logistic Info */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Logistic Info</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Dock Code</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Address</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Process Type</Label></FormGroup>
            </div>
          </div>

          {/* Images */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Images</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Part</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Packing</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> Outer</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> QKP</Label></FormGroup>
              <FormGroup check><Label check><Input type="checkbox" /> BKP</Label></FormGroup>
            </div>
          </div>

          {/* Inner Materials */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Inner Materials</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Box</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Mat No</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Length</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Width</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Height</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Volume Inner</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Volume Outer</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Usage</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Source</Label></FormGroup>
              </div>
              {[...Array(9).keys()].map(i => (
                  <div key={i}>
                      <FormGroup check><Label check><Input type="checkbox" /> Outer {i + 1}</Label></FormGroup>
                      <div style={{ paddingLeft: '20px' }}>
                          <FormGroup check><Label check><Input type="checkbox" /> Mat No</Label></FormGroup>
                          <FormGroup check><Label check><Input type="checkbox" /> Usage</Label></FormGroup>
                      </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row mt-3">
          {/* Outer Materials */}
          <div className="col-md-4">
            <FormGroup check>
              <Label check>
                <Input type="checkbox" />{' '}
                <strong>Outer Materials</strong>
              </Label>
            </FormGroup>
            <div style={{ paddingLeft: '20px' }}>
              <FormGroup check><Label check><Input type="checkbox" /> Module</Label></FormGroup>
              <div style={{ paddingLeft: '20px' }}>
                  <FormGroup check><Label check><Input type="checkbox" /> Mat No</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Length</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Width</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Height</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Volume Inner</Label></FormGroup>
                  <FormGroup check><Label check><Input type="checkbox" /> Usage</Label></FormGroup>
              </div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default ColumnSelectionModal;