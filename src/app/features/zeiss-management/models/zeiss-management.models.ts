export interface ZeissInstrument {
  instrumentId: number;
  category: string;
  partNumber: string;
  partDescription: string;
  unitPrice: number;
  openingQuantity: number;
  currentQuantity: number;
  reorderLevel: number;
  lastTransactionOnUtc?: string;
  createdOnUtc?: string;
  catalogueFile: string;
  catalogueName: string;
  isActive: boolean;
}
export interface ZeissCustomer {
  customerId: number;
  sourceSheet: string;
  sourceRowNo?: number;
  sipNumber: string;
  customerCode: string;
  customerName: string;
  area: string;
  iBaseId: string;
  postalCode: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  stylusThread: string;
  address: string;
  gstin: string;
  isActive: boolean;
}
export interface ZeissEnquiryItem {
  enquiryItemId: number;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  quantity: number;
  note: string;
}
export interface ZeissEnquiry {
  enquiryId: number;
  enquiryNo: string;
  legacyRefNo: string;
  customerId: number;
  customerName: string;
  contactPerson: string;
  email: string;
  contactNumber: string;
  enquiryDate: string;
  requirement: string;
  remarks: string;
  status: string;
  createdOnUtc: string;
  updatedOnUtc?: string;
  items: ZeissEnquiryItem[];
}
export interface ZeissQuotationItem {
  quotationItemId: number;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export interface ZeissQuotation {
  quotationId: number;
  quotationNo: string;
  enquiryId: number;
  enquiryNo: string;
  customerId: number;
  customerName: string;
  customerAddress: string;
  contactPerson: string;
  customerEmail: string;
  quotationDate: string;
  validityDays: number;
  subtotalAmount: number;
  discountPercent: number;
  discountAmount: number;
  taxableAmount: number;
  taxPercent: number;
  taxAmount: number;
  totalAmount: number;
  paymentTerms: string;
  deliveryTerms: string;
  specialConditions: string;
  status: string;
  versionNo: number;
  sentOnUtc?: string;
  clientResponse: string;
  clientResponseOnUtc?: string;
  generatedPdfPath: string;
  items: ZeissQuotationItem[];
}
export interface ZeissFollowUp {
  followUpId: number;
  quotationId: number;
  followUpNo: number;
  dueOnUtc: string;
  status: string;
  notes: string;
  completedOnUtc?: string;
}
export interface ZeissLifecycleItem {
  lifecycleItemId: number;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export interface ZeissLifecycle {
  lifecycleId: number;
  enquiryId: number;
  enquiryNo: string;
  quotationId: number;
  quotationNo: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerGstin: string;
  enquiryDate: string;
  currentStage: string;
  followUpCallOn?: string;
  followUpMailOn?: string;
  clientConfirmed: boolean;
  clientConfirmedOn?: string;
  vendorCode: string;
  clientPoNo: string;
  poDate?: string;
  paymentStatus: string;
  paymentReceivedDate?: string;
  deliveryDate?: string;
  deliveryMode: string;
  deliveryRemarks: string;
  acknowledgementReceived: boolean;
  acknowledgementDate?: string;
  acknowledgementRemarks: string;
  piNo: string;
  piDate?: string;
  tiNo: string;
  tiDate?: string;
  quoteValue: number;
  remarks: string;
  createdOnUtc: string;
  updatedOnUtc?: string;
  items: ZeissLifecycleItem[];
}
export interface ZeissStageCount {
  stage: string;
  count: number;
}
export interface ZeissDashboard {
  totalInstruments: number;
  totalStockQuantity: number;
  totalCustomers: number;
  openEnquiries: number;
  quotationsPending: number;
  activeSales: number;
  piPending: number;
  paymentPending: number;
  deliveryPending: number;
  acknowledgementPending: number;
  lowStockItems: number;
  nonMovingItems: number;
  pipelineValue: number;
  stageCounts: ZeissStageCount[];
  lowStock: ZeissInstrument[];
  nonMoving: ZeissInstrument[];
  recentSales: ZeissLifecycle[];
}
export interface ZeissLookups {
  customers: ZeissCustomer[];
  instruments: ZeissInstrument[];
  stages: string[];
  paymentStatuses: string[];
}
export interface ZeissBilling {
  lifecycleId: number;
  enquiryNo: string;
  quotationNo: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  clientGstin: string;
  clientPoNo: string;
  taxableValue: number;
  hsnCode: string;
  taxMode: string;
  taxPercent: number;
  isLocked: boolean;
  acknowledgementReceived: boolean;
  currentStage: string;
}
export interface ZeissInvoiceItem {
  invoiceItemId: number;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}
export interface ZeissInvoice {
  invoiceId: number;
  lifecycleId: number;
  enquiryNo: string;
  quotationNo: string;
  documentType: 'PI' | 'TI';
  invoiceNo: string;
  financialYear: string;
  invoiceDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  clientGstin: string;
  clientPoNo: string;
  hsnCode: string;
  taxMode: string;
  subtotalAmount: number;
  taxPercent: number;
  sgstPercent: number;
  cgstPercent: number;
  igstPercent: number;
  sgstAmount: number;
  cgstAmount: number;
  igstAmount: number;
  totalAmount: number;
  status: string;
  sentOnUtc?: string;
  createdOnUtc: string;
  items: ZeissInvoiceItem[];
}
export interface ZeissGrn {
  grnId: number;
  grnNo: string;
  dateReceived: string;
  supplier: string;
  supplierPoRef: string;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  qtyReceived: number;
  receivedBy: string;
  qcStatus: string;
  qcInspectedBy: string;
  calibrationCertReceived: boolean;
  remarks: string;
  stockPosted: boolean;
  createdOnUtc: string;
}
export interface ZeissInventoryTransaction {
  transactionId: number;
  instrumentId: number;
  partNumber: string;
  partDescription: string;
  lifecycleId?: number;
  grnId?: number;
  transactionType: string;
  quantityChange: number;
  balanceQuantity: number;
  referenceNo: string;
  remarks: string;
  createdOnUtc: string;
}
export interface ZeissNotification {
  notificationId: number;
  notificationType: string;
  instrumentId?: number;
  title: string;
  message: string;
  route: string;
  isRead: boolean;
  emailSent: boolean;
  createdOnUtc: string;
}
export interface ZeissAttachment {
  attachmentId: number;
  entityType: string;
  entityId: number;
  originalFileName: string;
  relativePath: string;
  contentType: string;
  fileSizeBytes: number;
  createdOnUtc: string;
}
