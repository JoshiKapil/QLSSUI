import { rgb } from 'pdf-lib';

// Coordinates are A4 landscape PDF points, mapped from the 1535 x 1024
// certificate-template.png artwork. Keep every printable position here.
export const CERTIFICATE_PDF_LAYOUT = {
  page: { width: 841.89, height: 595.28 },
  // Keep the PDF page itself at full A4 landscape size. Cropping to the
  // template artwork changes the printable page box and can make print
  // previews treat the certificate as a custom/square sheet.
  background: { x: 0, y: 0, fit: 'fill' as const, cropPageToArtwork: false },
  colors: {
    navy: rgb(0.01, 0.05, 0.34),
    green: rgb(0.00, 0.40, 0.10),
    gold: rgb(0.98, 0.69, 0.00),
    blue: rgb(0.03, 0.43, 0.87),
    red: rgb(0.93, 0.02, 0.03),
    topicRule: rgb(0.78, 0.67, 0.35),
    templatePaper: rgb(0.992, 0.992, 0.988),
    body: rgb(0, 0, 0),
    white: rgb(1, 1, 1),
    orange: rgb(1, 0.48, 0.02),
    metadataSurface: rgb(0.985, 0.982, 0.968),
    metadataMuted: rgb(0.28, 0.31, 0.38)
  },
  verticalFlow: {
    completionY: 225,
    trainingNameY: 198,
    detailValueY: 137,
    dateValueY: 82
  },
  userName: { centerX: 433, y: 258, fontSize: 44, maxWidth: 410 },
  completion: {
    centerX: 433,
    fontSize: 11,
    maxWidth: 355,
    clearArea: { x: 263, y: 198, width: 342, height: 38 }
  },
  trainingName: { centerX: 433, fontSize: 23, maxWidth: 410 },
  topics: {
    panel: { x: 646, y: 190, width: 180, height: 290 },
    bulletX: 683,
    bulletRadius: 3.1,
    textX: 695,
    firstRowCenterY: 435,
    lastRowCenterY: 213,
    maximumRowGap: 44,
    maxWidth: 115,
    fontSize: 9.4,
    minimumFontSize: 7.8,
    lineHeight: 10.8,
    compactAfterCount: 6,
    fontReductionPerItem: 0.15,
    separatorStartX: 657,
    separatorEndX: 795,
    separatorThickness: 0,
    separatorDash: [1.2, 1.8],
    maxItems: 8,
    maxLinesPerItem: 2,
    overflowMaxLines: 3
  },
  metadataPanel: {
    mask: { x: 92, y: 108, width: 682, height: 80 },
    x: 116,
    y: 120,
    width: 642,
    height: 58,
    gap: 6,
    border: { x: 112, y: 117, width: 650, height: 64, thickness: 1.15, radius: 11 },
    labelY: 155,
    labelFontSize: 7.8,
    iconSize: 8.5,
    iconGap: 3.5,
    separator: { y1: 124, y2: 167, thickness: 0.5, dash: [1.2, 2.2] }
  },
  details: {
    certificateNumber: { label: 'CERTIFICATE NO.', centerX: 193.25, maxWidth: 137, fontSize: 10.4, minimumFontSize: 8.2, maxLines: 2, lineHeight: 10, weight: 'bold' as const },
    trainingHours: { label: 'TRAINING HOURS', centerX: 355.75, maxWidth: 137, fontSize: 10.4, minimumFontSize: 8.2, maxLines: 1, lineHeight: 10, weight: 'bold' as const },
    location: { label: 'LOCATION', centerX: 518.25, maxWidth: 137, fontSize: 10.4, minimumFontSize: 8.2, maxLines: 2, lineHeight: 10, weight: 'bold' as const },
    trainerName: { label: 'TRAINER NAME', centerX: 680.75, maxWidth: 137, fontSize: 10.4, minimumFontSize: 8.2, maxLines: 2, lineHeight: 10, weight: 'bold' as const }
  },
  dateOfIssue: { centerX: 220, fontSize: 9.4, minimumFontSize: 8, maxWidth: 93, maxLines: 1, lineHeight: 9, weight: 'regular' as const },
  fileName: { fallback: 'training-certificate', maxSlugLength: 60 }
} as const;

export type CertificatePdfLayout = typeof CERTIFICATE_PDF_LAYOUT;







