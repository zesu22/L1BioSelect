type deviceType = "Face" | "Finger" | "Iris";

type challengeTypes = "BIO" | "PIN" | "OTP" | "WALLET";

type challengeFormats = "encoded-json" | "number" | "alpha-numeric" | "jwt";

type validAuthFactors = "PIN" | "OTP" | "BIO";

type buttonTypes = "button" | "cancel" | "reset" | "submit";

type deepLinkParamPlaceholder = "LINK_CODE" | "LINK_EXPIRE_DT";

type EnvType = "Staging" | "Developer" | "Pre-Production" | "Production";

type FingerSubBioType =
  | "Left IndexFinger"
  | "Left MiddleFinger"
  | "Left RingFinger"
  | "Left LittleFinger"
  | "Left Thumb"
  | "Right IndexFinger"
  | "Right MiddleFinger"
  | "Right RingFinger"
  | "Right LittleFinger"
  | "Right Thumb"
  | "UNKNOWN";

type IrisBioSubType = "Left" | "Right" | "UNKNOWN";

enum BioType {
  FACE = "Face",
  FINGER = "Finger",
  IRIS = "Iris",
}

const configurationKeys = {
  sbiEnv: "sbi.env",
  sbiPortRange: "sbi.port.range", //hyphen separated numbers (inclusive). default is 4501-4600

  sbiCAPTURETimeoutInSeconds: "sbi.timeout.CAPTURE",
  sbiDISCTimeoutInSeconds: "sbi.timeout.DISC",
  sbiDINFOTimeoutInSeconds: "sbi.timeout.DINFO",

  sbiFaceCaptureCount: "sbi.capture.count.face",
  sbiFingerCaptureCount: "sbi.capture.count.finger",
  sbiIrisCaptureCount: "sbi.capture.count.iris",

  sbiFaceCaptureScore: "sbi.capture.score.face",
  sbiFingerCaptureScore: "sbi.capture.score.finger",
  sbiIrisCaptureScore: "sbi.capture.score.iris",

  sbiIrisBioSubtypes: "sbi.bio.subtypes.iris", //comma separated list of bio-subtypes. default is "UNKNOWN"
  sbiFingerBioSubtypes: "sbi.bio.subtypes.finger", //comma separated list of bio-subtypes. default is "UNKNOWN"

  resendOtpTimeout: "resend.otp.delay.secs",
  sendOtpChannels: "send.otp.channels", //comma separated list of otp channels.
  captchaEnableComponents: "captcha.enable", //comma separated list of components where captcha needs to be shown
  captchaSiteKey: "captcha.sitekey", //site key for ReCAPTCHA

  linkCodeExpireInSec: "mosip.esignet.link-code-expire-in-secs",
  linkCodeDeferredTimeoutInSec:
    "mosip.esignet.link-status-deferred-response-timeout-secs",
  qrCodeDeepLinkURI: "mosip.esignet.qr-code.deep-link-uri",
  appDownloadURI: "mosip.esignet.qr-code.download-uri",
  signInWithQRCodeEnable: "mosip.esignet.qr-code.enable",
  authTxnIdLength: "auth.txnid.length",
};

export {
  EnvType,
  BioType,
  IrisBioSubType,
  FingerSubBioType,
  deviceType,
  challengeTypes,
  configurationKeys,
  validAuthFactors,
  deepLinkParamPlaceholder,
  buttonTypes,
  challengeFormats,
};
