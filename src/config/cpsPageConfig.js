export const ROLES = {
  ADMIN: 'admin',
  ENGINEER: 'engineer',
  PROCUREMENT: 'procurement',
  VIEWER: 'viewer',
  ADMIN_PSE: 'admin_pse',
  ADMIN_LOGISTIC: 'admin_logistic',
  SUPPLIER: 'supplier',
};

export const DEPARTMENTS = {
    PSE: 'PSE',
    PCD: 'PCD',
    LOGISTIC: 'LOGISTIC',
    SUPPLIER: 'SUPPLIER',
};

export const cpsPageConfig = {
  [DEPARTMENTS.PSE]: {
    [ROLES.ADMIN]: {
      general: { visible: true, editable: true },
      pse: { visible: true, editable: true },
      packing: { visible: true, editable: true },
      images: { visible: true, editable: true },
      logistic: { visible: true, editable: true },
    },
    [ROLES.ADMIN_PSE]: {
      general: { visible: true, editable: true },
      pse: { visible: true, editable: true },
      packing: { visible: true, editable: false },
      images: { visible: true, editable: false },
      logistic: { visible: true, editable: false },
    },
    [ROLES.ENGINEER]: {
      general: { visible: true, editable: true },
      pse: { visible: true, editable: true },
      packing: { visible: true, editable: true },
      images: { visible: true, editable: true },
      logistic: { visible: false, editable: false },
    },
    [ROLES.VIEWER]: {
        general: { visible: true, editable: false },
        pse: { visible: true, editable: false },
        packing: { visible: true, editable: false },
        images: { visible: true, editable: false },
        logistic: { visible: false, editable: false },
    }
  },
  [DEPARTMENTS.PCD]: {
    [ROLES.PROCUREMENT]: {
      general: { visible: true, editable: false },
      pse: { visible: false, editable: false },
      packing: { visible: true, editable: false },
      images: { visible: true, editable: false },
      logistic: { visible: true, editable: true },
    },
    [ROLES.VIEWER]: {
        general: { visible: true, editable: false },
        pse: { visible: false, editable: false },
        packing: { visible: true, editable: false },
        images: { visible: true, editable: false },
        logistic: { visible: true, editable: false },
    }
  },
  [DEPARTMENTS.LOGISTIC]: {
    [ROLES.ADMIN_LOGISTIC]: {
      general: { visible: true, editable: true },
      pse: { visible: true, editable: false },
      packing: { visible: true, editable: false },
      images: { visible: true, editable: false },
      logistic: { visible: true, editable: true },
    },
  },
  [DEPARTMENTS.SUPPLIER]: {
    [ROLES.SUPPLIER]: {
      general: { visible: true, editable: false },
      pse: { visible: false, editable: false },
      packing: { visible: true, editable: true },
      images: { visible: true, editable: true },
      logistic: { visible: false, editable: false },
    },
  },
  // Fallback for any other combination
  default: {
    general: { visible: true, editable: false },
    pse: { visible: false, editable: false },
    packing: { visible: true, editable: false },
    images: { visible: true, editable: false },
    logistic: { visible: false, editable: false },
  },
};