import { rgb } from 'pdf-lib';

// Coordinates are A4 landscape PDF points, mapped from the 1535 x 1024
// certificate-template.png artwork. Keep every printable position here.
export const CERTIFICATE_PDF_LAYOUT = {
  page: { width: 841.89, height: 595.28 },
  background: { x: 0, y: 0, fit: 'contain' as const, cropPageToArtwork: true },
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
    // Mask only the template's sample marks; do not cover the panel background.
    templateMarks: {
      bulletX: 675.3,
      bulletY: [451.9, 415.8, 379.6, 343.5, 307.4, 271.2, 235.6, 200.0],
      bulletRadius: 6.8,
      ruleX: 664,
      ruleWidth: 130,
      // The template line at y=177.4 is the metadata border, so never mask it.
      ruleY: [431.5, 395.3, 359.2, 322.5, 285.8, 250.8, 214.6],
      ruleHeight: 3.6
    },
    bulletX: 663,
    bulletRadius: 3.2,
    textX: 681,
    firstRowCenterY: 438,
    // Hard lower boundary keeps 6-8 topic rows above the metadata panel.
    lastRowCenterY: 230,
    maximumRowGap: 42,
    maxWidth: 112,
    fontSize: 9.8,
    minimumFontSize: 8.6,
    lineHeight: 12.5,
    compactAfterCount: 6,
    fontReductionPerItem: 0.15,
    separatorStartX: 658,
    separatorEndX: 794,
    separatorThickness: 0.45,
    separatorDash: [1.2, 1.8],
    maxItems: 8,
    maxLinesPerItem: 2,
    overflowMaxLines: 3
  },
  metadataPanel: {
    mask: { x: 122, y: 113, width: 626, height: 70 },
    x: 132,
    y: 121,
    width: 606,
    height: 52,
    gap: 6,
    border: { x: 126, y: 118, width: 618, height: 60, thickness: 1.15, radius: 11.25 },
    labelY: 156,
    labelFontSize: 7.2,
    iconSize: 8,
    iconGap: 3,
    separator: { y1: 128, y2: 166, thickness: 0.55, dash: [1.2, 2.2] }
  },
  details: {
    certificateNumber: { label: 'CERTIFICATE NO.', centerX: 205.5, maxWidth: 128, fontSize: 9.2, minimumFontSize: 7.6, maxLines: 2, lineHeight: 9, weight: 'regular' as const },
    trainingHours: { label: 'TRAINING HOURS', centerX: 358.5, maxWidth: 128, fontSize: 9.4, minimumFontSize: 8, maxLines: 1, lineHeight: 9, weight: 'regular' as const },
    location: { label: 'LOCATION', centerX: 511.5, maxWidth: 128, fontSize: 9.2, minimumFontSize: 7.6, maxLines: 2, lineHeight: 9, weight: 'regular' as const },
    trainerName: { label: 'TRAINER NAME', centerX: 664.5, maxWidth: 128, fontSize: 9.2, minimumFontSize: 7.6, maxLines: 2, lineHeight: 9, weight: 'regular' as const }
  },
  dateOfIssue: { centerX: 220, fontSize: 9.4, minimumFontSize: 8, maxWidth: 93, maxLines: 1, lineHeight: 9, weight: 'regular' as const },
  fileName: { fallback: 'training-certificate', maxSlugLength: 60 }
} as const;

export type CertificatePdfLayout = typeof CERTIFICATE_PDF_LAYOUT;







