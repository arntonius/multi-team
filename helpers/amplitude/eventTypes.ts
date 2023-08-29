import { PickEnum } from 'utils/enum'

export enum TrackingEventName {
  VIEW_HOME = 'VIEW_HOME',
  VIEW_SURVEY_STEP = 'VIEW_SURVEY_STEP',
  SELECT_LANGUAGE = 'SELECT_LANGUAGE',
  VIEW_SURVEY_LANDING_PAGE = 'VIEW_SURVEY_LANDING_PAGE',
  START_SURVEY = 'START_SURVEY',
  VIEW_RECOMMENDATIONS = 'VIEW_RECOMMENDATIONS',
  SELECT_CAR = 'SELECT_CAR',
  VIEW_CAR_DETAILS = 'VIEW_CAR_DETAILS',
  VIEW_CAR_VARIANT = 'VIEW_CAR_VARIANT',
  VIEW_LOAN_CALCULATOR = 'VIEW_LOAN_CALCULATOR',
  SELECT_LOAN_CALCULATOR = 'SELECT_LOAN_CALCULATOR',
  VIEW_CONTACT_DEALER = 'VIEW_CONTACT_DEALER',
  SUBMIT_CONTACT = 'SUBMIT_CONTACT',
  VALIDATE_PHONE_NUMBER = 'VALIDATE_PHONE_NUMBER',
  HOME_CTA = 'HOME_CTA',
  SEND_WHATSAPP_MESSAGE = 'SEND_WHATSAPP_MESSAGE',
  VIEW_CAR_RESULTS = 'VIEW_CAR_RESULTS',
  TAKE_CAR_RESULTS_SURVEY = 'TAKE_CAR_RESULTS_SURVEY',
  SEARCH_CAR_RESULTS = 'SEARCH_CAR_RESULTS',
  FILTER_CAR_RESULTS = 'FILTER_CAR_RESULTS',
  FILTER_CAR_RESULTS_CANCEL = 'FILTER_CAR_RESULTS_CANCEL',
  SELECT_CAR_RESULT = 'SELECT_CAR_RESULT',
  SELECT_CAR_RESULT_DETAILS_THUMBNAIL = 'SELECT_CAR_RESULT_DETAILS_THUMBNAIL',
  SELECT_CAR_RESULT_VARIANT = 'SELECT_CAR_RESULT_VARIANT',
  SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN = 'SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN',
  SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN_CANCEL = 'SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN_CANCEL',
  SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN_START = 'SELECT_CAR_RESULT_VARIANT_CALCULATE_LOAN_START',
  SELECT_CAR_RESULT_VARIANT_DETAILS_THUMBNAIL = 'SELECT_CAR_RESULT_VARIANT_DETAILS_THUMBNAIL',
  SELECT_CAR_RESULT_VARIANT_DETAILS_START_SURVEY = 'SELECT_CAR_RESULT_VARIANT_DETAILS_START_SURVEY',
  SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN = 'SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN',
  SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN_CANCEL = 'SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN_CANCEL',
  SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN_START_SURVEY = 'SELECT_CAR_RESULT_VARIANT_DETAILS_CUSTOMIZE_LOAN_START_SURVEY',
  SELECT_CAR_RESULT_VARIANT_DETAILS_SPECIFICATIONS = 'SELECT_CAR_RESULT_VARIANT_DETAILS_SPECIFICATIONS',
  SELECT_CAR_RESULT_VARIANT_DETAILS_DESCRIPTION = 'SELECT_CAR_RESULT_VARIANT_DETAILS_DESCRIPTION',
  SELECT_CAR_RESULT_VARIANT_DETAILS_VIEW_BROCHURE = 'SELECT_CAR_RESULT_VARIANT_DETAILS_VIEW_BROCHURE',
  SELECT_HOME_BRAND = 'SELECT_HOME_BRAND',
  SELECT_HOME_BODY_TYPE = 'SELECT_HOME_BODY_TYPE',
  SELECT_HOME_POPULAR_CARS = 'SELECT_HOME_POPULAR_CARS',
  NAVIGATE_HOME_POPULAR_CARS = 'NAVIGATE_HOME_POPULAR_CARS',
  SELECT_HOME_BROWSE = 'SELECT_HOME_BROWSE',
  SELECT_HOME_START_SURVEY = 'SELECT_HOME_START_SURVEY',
  SELECT_HOME_FIND_OUT_MORE = 'SELECT_HOME_FIND_OUT_MORE',
  NAVIGATE_HOME_PROMOS = 'NAVIGATE_HOME_PROMOS',
  SELECT_HOME_TERMS = 'SELECT_HOME_TERMS',
  SELECT_HOME_PRIVACY = 'SELECT_HOME_PRIVACY',
  SELECT_HOME_CONTACT = 'SELECT_HOME_CONTACT',
  SELECT_HOME_SEND_DETAILS = 'SELECT_HOME_SEND_DETAILS',
  VIEW_ACCOUNT_CREATION = 'VIEW_ACCOUNT_CREATION',
  VIEW_ACCOUNT_CREATION_OTP = 'VIEW_ACCOUNT_CREATION_OTP',
  SELECT_ACCOUNT_CREATION_OTP_SUBMIT = 'SELECT_ACCOUNT_CREATION_OTP_SUBMIT',
  SELECT_ACCOUNT_CREATION_OTP_RESEND = 'SELECT_ACCOUNT_CREATION_OTP_RESEND',
  VIEW_PREAPPROVAL_STARTED = 'VIEW_PREAPPROVAL_STARTED',
  VIEW_PREAPPROVAL_OCCUPATION = 'VIEW_PREAPPROVAL_OCCUPATION',
  SELECT_PREAPPROVAL_OCCUPATION_NEXT = 'SELECT_PREAPPROVAL_OCCUPATION_NEXT',
  VIEW_PREAPPROVAL_INCOME = 'VIEW_PREAPPROVAL_INCOME',
  SELECT_PREAPPROVAL_INCOME_NEXT = 'SELECT_PREAPPROVAL_INCOME_NEXT',
  VIEW_PREAPPROVAL_ADDRESS = 'VIEW_PREAPPROVAL_ADDRESS',
  SELECT_PREAPPROVAL_ADDRESS_NEXT = 'SELECT_PREAPPROVAL_ADDRESS_NEXT',
  VIEW_PREAPPROVAL_EMAIL = 'VIEW_PREAPPROVAL_EMAIL',
  SELECT_PREAPPROVAL_EMAIL_NEXT = 'SELECT_PREAPPROVAL_EMAIL_NEXT',
  VIEW_PREAPPROVAL_KTP_UPLOAD = 'VIEW_PREAPPROVAL_KTP_UPLOAD',
  SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA = 'SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA',
  SELECT_PREAPPROVAL_KTP_UPLOAD_GALLERY = 'SELECT_PREAPPROVAL_KTP_UPLOAD_GALLERY',
  VIEW_PREAPPROVAL_KTP_UPLOAD_CAMERA = 'VIEW_PREAPPROVAL_KTP_UPLOAD_CAMERA',
  VIEW_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW = 'VIEW_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW',
  SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW_USE = 'SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW_USE',
  SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW_RETAKE = 'SELECT_PREAPPROVAL_KTP_UPLOAD_CAMERA_PREVIEW_RETAKE',
  VIEW_PREAPPROVAL_KTP_UPLOAD_FAILURE = 'VIEW_PREAPPROVAL_KTP_UPLOAD_FAILURE',
  SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_CAMERA = 'SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_CAMERA',
  SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_GALLERY = 'SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_GALLERY',
  SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_CLOSE = 'SELECT_PREAPPROVAL_KTP_UPLOAD_FAILURE_CLOSE',
  VIEW_PREAPPROVAL_KTP_UPLOAD_GALLERY_CROPPING = 'VIEW_PREAPPROVAL_KTP_UPLOAD_GALLERY_CROPPING',
  VIEW_PREAPPROVAL_KTP_UPLOAD_SUCCESS = 'VIEW_PREAPPROVAL_KTP_UPLOAD_SUCCESS',
  SELECT_PREAPPROVAL_KTP_UPLOAD_SUCCESS_START = 'SELECT_PREAPPROVAL_KTP_UPLOAD_SUCCESS_START',
  VIEW_PREAPPROVAL_BANK_LINKING = 'VIEW_PREAPPROVAL_BANK_LINKING',
  SELECT_PREAPPROVAL_BANK_LINKING_SKIP = 'SELECT_PREAPPROVAL_BANK_LINKING_SKIP',
  SELECT_PREAPPROVAL_BANK_LINKING_BANK = 'SELECT_PREAPPROVAL_BANK_LINKING_BANK',
  VIEW_PREAPPROVAL_BANK_LINKING_BANK_MODAL = 'VIEW_PREAPPROVAL_BANK_LINKING_BANK_MODAL',
  SELECT_PREAPPROVAL_BANK_LINKING_BANK_MODAL_OK = 'SELECT_PREAPPROVAL_BANK_LINKING_BANK_MODAL_OK',
  SELECT_PREAPPROVAL_BANK_LINKING_BANK_MODAL_DENY = 'SELECT_PREAPPROVAL_BANK_LINKING_BANK_MODAL_DENY',
  VIEW_PREAPPROVAL_BANK_LINKING_INCOME = 'VIEW_PREAPPROVAL_BANK_LINKING_INCOME',
  SELECT_PREAPPROVAL_BANK_LINKING_INCOME_SAVE = 'SELECT_PREAPPROVAL_BANK_LINKING_INCOME_SAVE',
  VIEW_PREAPPROVAL_PROCESSING = 'VIEW_PREAPPROVAL_PROCESSING',
  VIEW_PREAPPROVAL_SMS = 'VIEW_PREAPPROVAL_SMS',
  SELECT_PREAPPROVAL_SMS_DOWNLOAD = 'SELECT_PREAPPROVAL_SMS_DOWNLOAD',
  VIEW_PREAPPROVAL_SUCCESS = 'VIEW_PREAPPROVAL_SUCCESS',
  SELECT_PREAPPROVAL_SUCCESS_DOWNLOAD = 'SELECT_PREAPPROVAL_SUCCESS_DOWNLOAD',
  SELECT_PREAPPROVAL_SUCCESS_START_APPLICATION = 'SELECT_PREAPPROVAL_SUCCESS_START_APPLICATION',
  SELECT_PREAPPROVAL_SUCCESS_WHATSAPP = 'SELECT_PREAPPROVAL_SUCCESS_WHATSAPP',
  VIEW_PREAPPROVAL_REJECTED = 'VIEW_PREAPPROVAL_REJECTED',
  SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL = 'SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL',
  SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL_CANCEL = 'SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL_CANCEL',
  SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL_START = 'SELECT_CAR_RESULT_VARIANT_DETAILS_GET_PREAPPROVAL_START',
  VIEW_LOGGED_OUT_MODAL = 'VIEW_LOGGED_OUT_MODAL',
  SELECT_CAR_RESULT_DETAILS_COUPON = 'SELECT_CAR_RESULT_DETAILS_COUPON',
  SELECT_CAR_RESULT_VARIANT_DETAILS_COUPON = 'SELECT_CAR_RESULT_VARIANT_DETAILS_COUPON',
  VIEW_CAR_RESULT_VARIANT_DETAILS = 'VIEW_CAR_RESULT_VARIANT_DETAILS',
  SELECT_COUPON_VALIDATE = 'SELECT_COUPON_VALIDATE',
  VIEW_V2_LOAN_CALCULATOR_SURVEY = 'VIEW_V2_LOAN_CALCULATOR_SURVEY',
  SELECT_V2_LOAN_CALCULATOR_SURVEY_CALCULATE = 'SELECT_V2_LOAN_CALCULATOR_SURVEY_CALCULATE',
  VIEW_V2_LOAN_CALCULATOR = 'VIEW_V2_LOAN_CALCULATOR',
  SELECT_V2_LOAN_CALCULATOR_VALUES = 'SELECT_V2_LOAN_CALCULATOR_VALUES',
  SELECT_V2_LOAN_CALCULATOR_EDIT = 'SELECT_V2_LOAN_CALCULATOR_EDIT',
  SELECT_V2_LOAN_CALCULATOR_SPEAK = 'SELECT_V2_LOAN_CALCULATOR_SPEAK',
  SELECT_V2_LOAN_CALCULATOR_SELECT = 'SELECT_V2_LOAN_CALCULATOR_SELECT',
  SELECT_V2_LOAN_CALCULATOR_GET_PREAPPROVED = 'SELECT_V2_LOAN_CALCULATOR_GET_PREAPPROVED',
  SELECT_V2_LOAN_CALCULATOR_RECOMMENDATION = 'SELECT_V2_LOAN_CALCULATOR_RECOMMENDATION',
  DP_Capacity_Not_In_Range = 'DP_Capacity_Not_In_Range',
  Occupation_Blacklisted = 'Occupation_Blacklisted',
  EKYC_Failed = 'EKYC_Failed',
  COVADEX_Blacklisted = 'COVADEX_Blacklisted',
  Bank_Link_Result_Fail = 'Bank_Link_Result_Fail',
  Unsupported_Province = 'Unsupported_Province',
  WEB_LANDING_PAGE_VIEW = 'WEB_LANDING_PAGE_VIEW',
  WEB_LANDING_PAGE_VAR_VIEW = 'WEB_LANDING_PAGE_VAR_VIEW',
  WEB_PROFILE_PAGE_VIEW = 'WEB_PROFILE_PAGE_VIEW',
  WEB_CAR_SEARCH_PAGE_VIEW = 'WEB_CAR_SEARCH_PAGE_VIEW',
  WEB_CAR_SEARCH_PAGE_VAR_VIEW = 'WEB_CAR_SEARCH_PAGE_VAR_VIEW',
  WEB_VARIANT_LIST_PAGE_VIEW = 'WEB_VARIANT_LIST_PAGE_VIEW',
  WEB_PDP_PRICE_TAB_VIEW = 'WEB_PDP_PRICE_TAB_VIEW',
  WEB_PDP_CREDIT_TAB_VIEW = 'WEB_PDP_CREDIT_TAB_VIEW',
  WEB_PDP_SPECIFICATION_VIEW = 'WEB_PDP_SPECIFICATION_VIEW',
  WEB_PDP_GALLERY_TAB_VIEW = 'WEB_PDP_GALLERY_TAB_VIEW',
  WEB_PDP_SPESIFIKASI_TAB_VARIANT_CLICK = 'WEB_PDP_SPESIFIKASI_TAB_VARIANT_CLICK',
  WEB_PDP_BUTTON_DOWNLOAD_BROSUR_CLICK = 'WEB_PDP_BUTTON_DOWNLOAD_BROSUR_CLICK',
  WEB_PDP_OPEN_VIDEO_POP_UP = 'WEB_PDP_OPEN_VIDEO_POP_UP',
  WEB_PDP_PLAY_VIDEO = 'WEB_PDP_PLAY_VIDEO',
  WEB_PDP_CLOSE_VIDEO_POP_UP = 'WEB_PDP_CLOSE_VIDEO_POP_UP',
  WEB_PDP_CREDIT_TAB_BUTTON_HITUNG_CICILAN_CLICK = 'WEB_PDP_CREDIT_TAB_BUTTON_HITUNG_CICILAN_CLICK',
  WEB_PDP_PELUANG_MUDAH_LAINNYA_CLICK = 'WEB_PDP_PELUANG_MUDAH_LAINNYA_CLICK',
  WEB_PDP_CTA_HITUNG_KEMAMPUAN_CLICK = 'WEB_PDP_CTA_HITUNG_KEMAMPUAN_CLICK',
  WEB_REGULAR_CALCULATOR_PAGE_VIEW = 'WEB_REGULAR_CALCULATOR_PAGE_VIEW',
  WEB_SPECIAL_RATE_CALCULATOR_PAGE_VIEW = 'WEB_SPECIAL_RATE_CALCULATOR_PAGE_VIEW',
  WEB_LOGIN_PAGE_VIEW = 'WEB_ LOGIN PAGE_VIEW',
  WEB_LOGIN_OTP_PAGE_VIEW = 'WEB_LOGIN_OTP_PAGE_VIEW',
  WEB_LOGIN_SUCCESS_PAGE_VIEW = 'WEB_LOGIN_SUCCESS_PAGE_VIEW',
  WEB_REGISTRATION_PAGE_VIEW = 'WEB_REGISTRATION_PAGE_VIEW',
  WEB_REGISTRATION_OTP_PAGE_VIEW = 'WEB_REGISTRATION_OTP_PAGE_VIEW',
  WEB_REGISTRATION_SUCCESS_PAGE_VIEW = 'WEB_REGISTRATION_SUCCESS_PAGE_VIEW',
  WEB_GIIAS_CRM_REGISTRATION_FORM_PAGE_VIEW = 'WEB_GIIAS_CRM_REGISTRATION_FORM_PAGE_VIEW',
  WEB_GIIAS_CRM_SUCCESS_PAGE_VIEW = 'WEB_GIIAS_CRM_SUCCESS_PAGE_VIEW',
  WEB_GIIAS_CRM_SHOWQR_PAGE_VIEW = 'WEB_GIIAS_CRM_SHOWQR_PAGE_VIEW',
  WEB_GIIAS_CRM_OTP_PAGE_VIEW = 'WEB_GIIAS_CRM_OTP_PAGE_VIEW',
  WEB_VARIANT_LIST_PAGE_CODE_SUCCESS_INPUT = 'WEB_VARIANT_LIST_PAGE_CODE_SUCCESS_INPUT',
  WEB_VARIANT_LIST_PAGE_CODE_FAILED_INPUT = 'WEB_VARIANT_LIST_PAGE_CODE_FAILED_INPUT',
  WEB_LANDING_PAGE_LEADS_FORM_SUBMIT = 'WEB_LANDING_PAGE_LEADS_FORM_SUBMIT',
  WEB_CAR_OF_THE_MONTH_LEADS_FORM_SUBMIT = 'WEB_CAR_OF_THE_MONTH_LEADS_FORM_SUBMIT',
  WEB_CAR_SEARCH_PAGE_MINTA_PENAWARAN_CLICK_WA_CHATBOT = 'WEB_CAR_SEARCH_PAGE_MINTA_PENAWARAN_CLICK_WA_CHATBOT',
  WEB_CAR_VARIANT_LIST_PAGE_CLICK_WA_CHATBOT = 'WEB_CAR_VARIANT_LIST_PAGE_CLICK_WA_CHATBOT',
  WEB_CAR_VARIANT_LIST_PAGE_LEADS_FORM_SUBMIT = 'WEB_CAR_VARIANT_LIST_PAGE_LEADS_FORM_SUBMIT',
  WEB_CAR_VARIANT_LIST_CREDIT_TAB_CLICK_WA_CHATBOT = 'WEB_CAR_VARIANT_LIST_CREDIT_TAB_CLICK_WA_CHATBOT',
  WEB_REGULAR_CALCULATOR_PAGE_CONTACT_US_CLICK_WA_CHATBOT = 'WEB_REGULAR_CALCULATOR_PAGE_CONTACT_US_CLICK_WA_CHATBOT',
  WEB_SPECIAL_RATE_CALCULATOR_PAGE_CONTACT_US_CLICK_WA_CHATBOT = 'WEB_SPECIAL_RATE_CALCULATOR_PAGE_CONTACT_US_CLICK_WA_CHATBOT',
  WEB_TEMAN_SEVA_REGISTRATION_PAGE_VIEW = 'WEB_TEMAN_SEVA_REGISTRATION_PAGE_VIEW',
  WEB_TEMAN_SEVA_REGISTRATION_SUCCESS_PAGE_VIEW = 'WEB_TEMAN_SEVA_REGISTRATION_SUCCESS_PAGE_VIEW',
  WEB_TEMAN_SEVA_DASHBOARD_PAGE_VIEW = 'WEB_TEMAN_SEVA_DASHBOARD_PAGE_VIEW',
  WEB_BURGER_MENU_CLICK_TEMAN_SEVA = 'WEB_BURGER_MENU_CLICK_TEMAN_SEVA',
  WEB_REFINANCING_LANDING_PAGE_VIEW = 'WEB_REFINANCING_LANDING_PAGE_VIEW',
  WEB_REFINANCING_LEADS_FORM_PAGE_VIEW = 'WEB_REFINANCING_LEADS_FORM_PAGE_VIEW',
  WEB_REFINANCING_LEADS_BANNER_CLICK = 'WEB_REFINANCING_LEADS_BANNER_CLICK',
  WEB_REFINANCING_1ST_LEADS_FORM_SUBMIT = 'WEB_REFINANCING_1ST_LEADS_FORM_SUBMIT',
  WEB_REFINANCING_2ND_LEADS_FORM_SUBMIT = 'WEB_REFINANCING_2ND_LEADS_FORM_SUBMIT',
  WEB_REFINANCING_QUESTION_BANNER_CLICK = 'WEB_REFINANCING_QUESTION_BANNER_CLICK',
  WEB_REFINANCING_1ST_QUESTION_FORM_SUBMIT = 'WEB_REFINANCING_1ST_QUESTION_FORM_SUBMIT',
  WEB_REFINANCING_2ND_QUESTION_FORM_SUBMIT = 'WEB_REFINANCING_2ND_QUESTION_FORM_SUBMIT',
  WEB_LP_SEARCHWIDGET_SUBMIT = 'WEB_LP_SEARCHWIDGET_SUBMIT',
  WEB_LP_SEARCHWIDGET_ADVANCED_SEARCH_CLICK = 'WEB_LP_SEARCHWIDGET_ADVANCED_SEARCH_CLICK',
  WEB_LP_CAROFTHEMONTH_BRAND_CLICK = 'WEB_LP_CAROFTHEMONTH_BRAND_CLICK',
  WEB_LP_CAROFTHEMONTH_CAR_CLICK = 'WEB_LP_CAROFTHEMONTH_CAR_CLICK',
  WEB_LP_BRANDRECOMMENDATION_SEE_ALL_CLICK = 'WEB_LP_BRANDRECOMMENDATION_SEE_ALL_CLICK',
  WEB_LP_BRANDRECOMMENDATION_LOGO_CLICK = 'WEB_LP_BRANDRECOMMENDATION_LOGO_CLICK',
  WEB_LP_BRANDRECOMMENDATION_CAR_CLICK = 'WEB_LP_BRANDRECOMMENDATION_CAR_CLICK',
  WEB_LP_BRANDRECOMMENDATION_CAR_SEE_ALL_CLICK = 'WEB_LP_BRANDRECOMMENDATION_CAR_SEE_ALL_CLICK',
  WEB_LP_TYPERECOMMENDATION_SEE_ALL_CLICK = 'WEB_LP_TYPERECOMMENDATION_SEE_ALL_CLICK',
  WEB_LP_TYPERECOMMENDATION_LOGO_CLICK = 'WEB_LP_TYPERECOMMENDATION_LOGO_CLICK',
  WEB_LP_TYPERECOMMENDATION_CAR_CLICK = 'WEB_LP_TYPERECOMMENDATION_CAR_CLICK',
  WEB_LP_TYPERECOMMENDATION_CAR_SEE_ALL_CLICK = 'WEB_LP_TYPERECOMMENDATION_CAR_SEE_ALL_CLICK',
  WEB_LP_CALCULATORWIDGET_CLICK = 'WEB_LP_CALCULATORWIDGET_CLICK',
  WEB_LP_ARTICLE_SEE_ALL_CLICK = 'WEB_LP_ARTICLE_SEE_ALL_CLICK',
  WEB_LP_ARTICLE_CATEGORY_CLICK = 'WEB_LP_ARTICLE_CATEGORY_CLICK',
  WEB_LP_ARTICLE_CLICK = 'WEB_LP_ARTICLE_CLICK',
  WEB_LP_MAIN_ARTICLE_CLICK = 'WEB_LP_MAIN_ARTICLE_CLICK',
  WEB_NAVIGATION_MEREK_TOYOTA_CLICK = 'WEB_NAVIGATION_MEREK_TOYOTA_CLICK',
  WEB_NAVIGATION_MEREK_DAIHATSU_CLICK = 'WEB_NAVIGATION_MEREK_DAIHATSU_CLICK',
  WEB_NAVIGATION_MEREK_BMW_CLICK = 'WEB_NAVIGATION_MEREK_BMW_CLICK',
  WEB_NAVIGATION_MEREK_ISUZU_CLICK = 'WEB_NAVIGATION_MEREK_ISUZU_CLICK',
  WEB_NAVIGATION_MEREK_PEUGEOT_CLICK = 'WEB_NAVIGATION_MEREK_PEUGEOT_CLICK',
  WEB_NAVIGATION_MEREK_ALL_CLICK = 'WEB_NAVIGATION_MEREK_ALL_CLICK',
  WEB_NAVIGATION_PROMO_CLICK = 'WEB_NAVIGATION_PROMO_CLICK',
  WEB_NAVIGATION_ARTICLE_BERITA_OTOMOTIF_CLICK = 'WEB_NAVIGATION_ARTICLE_BERITA_OTOMOTIF_CLICK',
  WEB_NAVIGATION_ARTICLE_REVIEW_MOBIL_CLICK = 'WEB_NAVIGATION_ARTICLE_REVIEW_MOBIL_CLICK',
  WEB_NAVIGATION_ARTICLE_TIPS_REKOMENDASI_CLICK = 'WEB_NAVIGATION_ARTICLE_TIPS_REKOMENDASI_CLICK',
  WEB_NAVIGATION_ARTICLE_KEUANGAN_CLICK = 'WEB_NAVIGATION_ARTICLE_KEUANGAN_CLICK',
  WEB_NAVIGATION_ARTICLE_ALL_CLICK = 'WEB_NAVIGATION_ARTICLE_ALL_CLICK',
  WEB_NAVIGATION_TENTANG_SEVA_CLICK = 'WEB_NAVIGATION_TENTANG_SEVA_CLICK',
  WEB_NAVIGATION_FACEBOOK_CLICK = 'WEB_NAVIGATION_FACEBOOK_CLICK',
  WEB_NAVIGATION_INSTAGRAM_CLICK = 'WEB_NAVIGATION_INSTAGRAM_CLICK',
  WEB_NAVIGATION_TWITTER_CLICK = 'WEB_NAVIGATION_TWITTER_CLICK',
  WEB_NAVIGATION_HUBUNGI_KAMI_CLICK = 'WEB_NAVIGATION_HUBUNGI_KAMI_CLICK',
  WEB_NAVIGATION_REFINANCING_CLICK = 'WEB_NAVIGATION_REFINANCING_CLICK',
  WEB_NAVIGATION_BELIMOBIL_CLICK = 'WEB_NAVIGATION_BELIMOBIL_CLICK',
  WEB_NAVIGATION_ARTICLE_CLICK = 'WEB_NAVIGATION_ARTICLE_CLICK',
  WEB_NAVIGATION_LAINNYA_CLICK = 'WEB_NAVIGATION_LAINNYA_CLICK',
  WEB_CITYSELECTOR_GANTILOKASI_CLICK = 'WEB_CITYSELECTOR_GANTILOKASI_CLICK',
  WEB_CITYSELECTOR_PILIHKOTA_CLICK = 'WEB_CITYSELECTOR_PILIHKOTA_CLICK',
  WEB_CITY_SELECTOR_POPUP_SUGGESTION_CLICK = 'WEB_CITY_SELECTOR_POPUP_SUGGESTION_CLICK',
  WEB_TOP_BANNER_CLICK = 'WEB_TOP_BANNER_CLICK',
  WEB_TOP_BANNER_VIEW = 'WEB_TOP_BANNER_VIEW',
  WEB_TOP_BANNER_NEXT_PREV_CLICK = 'WEB_TOP_BANNER_NEXT_PREV_CLICK',
  WEB_SEVALOGO_CLICK = 'WEB_SEVALOGO_CLICK',
  WEB_SEARCHBAR_SUGGESTION_CLICK = 'WEB_SEARCHBAR_SUGGESTION_CLICK',
  WEB_LOGIN_BUTTON_CLICK = 'WEB_LOGIN_BUTTON_CLICK',
  WEB_PROFILE_CLICK = 'WEB_PROFILE_CLICK',
  WEB_PROFILE_KELUAR_CLICK = 'WEB_PROFILE_KELUAR_CLICK',
  WEB_ANNOUNCEMENT_BOX_CLICK_CTA = 'WEB_ANNOUNCEMENT_BOX_CLICK_CTA',
  WEB_ANNOUNCEMENT_BOX_CLICK_CLOSE = 'WEB_ANNOUNCEMENT_BOX_CLICK_CLOSE',
  WEB_CARAPAKAI_ICON_CLICK = 'WEB_CARAPAKAI_ICON_CLICK',
  WEB_CARAPAKAI_EXPAND_CLICK = 'WEB_CARAPAKAI_EXPAND_CLICK',
  WEB_LP_TESTIMONY_NEXT_PREV_CLICK = 'WEB_LP_TESTIMONY_NEXT_PREV_CLICK',
  WEB_LP_TESTIMONY_CLICK = 'WEB_LP_TESTIMONY_CLICK',
  WEB_LP_TESTIMONY_POP_UP_CLOSE = 'WEB_LP_TESTIMONY_POP_UP_CLOSE',
  WEB_LP_SUB_PRODUCT_CLICK = 'WEB_LP_SUB_PRODUCT_CLICK',
  WEB_LP_KUALIFIKASI_KREDIT_TOP_CTA_CLICK = 'WEB_LP_KUALIFIKASI_KREDIT_TOP_CTA_CLICK',
  WEB_PROMO_BANNER_CLICK = 'WEB_PROMO_BANNER_CLICK',
  WEB_PROMO_BANNER_SEE_ALL_CLICK = 'WEB_PROMO_BANNER_SEE_ALL_CLICK',
  WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_EXPAND = 'WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_EXPAND',
  WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_COLLAPSE = 'WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_COLLAPSE',
  WEB_LP_BRANDRECOMMENDATION_CTA_HITUNG_KEMAMPUAN_CLICK = 'WEB_LP_BRANDRECOMMENDATION_CTA_HITUNG_KEMAMPUAN_CLICK',
  WEB_LP_HOW_TO_USE_SEVA_CLICK = 'WEB_LP_HOW_TO_USE_SEVA_CLICK',
  WEB_FOOTER_TENTANGKAMI = 'WEB_FOOTER_TENTANGKAMI',
  WEB_FOOTER_SYARATKETENTUAN = 'WEB_FOOTER_SYARATKETENTUAN',
  WEB_FOOTER_KEBIJAKANPRIVASI = 'WEB_FOOTER_KEBIJAKANPRIVASI',
  WEB_FOOTER_HUBUNGIKAMI = 'WEB_FOOTER_HUBUNGIKAMI',
  WEB_PLP_CLEAR_FILTER = 'WEB_PLP_CLEAR_FILTER',
  WEB_PLP_FILTER_SUBMIT = 'WEB_PLP_FILTER_SUBMIT',
  WEB_PLP_CAR_CLICK = 'WEB_PLP_CAR_CLICK',
  WEB_PLP_FILTER_CLICK = 'WEB_PLP_FILTER_CLICK',
  WEB_PLP_FILTER_CLOSE = 'WEB_PLP_FILTER_CLOSE',
  WEB_PLP_SORT_OPEN = 'WEB_PLP_SORT_OPEN',
  WEB_PLP_SORT_CLICK = 'WEB_PLP_SORT_CLICK',
  WEB_PLP_SORT_CLOSE = 'WEB_PLP_SORT_CLOSE',
  WEB_PLP_CEKPELUANG_BANNER_CLICK = 'WEB_PLP_CEKPELUANG_BANNER_CLICK',
  WEB_PLP_PELUANGMUDAH_BANNER_CLICK = 'WEB_PLP_PELUANGMUDAH_BANNER_CLICK',
  WEB_PLP_PELUANGSULIT_BANNER_CLICK = 'WEB_PLP_PELUANGSULIT_BANNER_CLICK',
  WEB_PLP_CEKPELUANG_POPUP_CLICK_CTA = 'WEB_PLP_CEKPELUANG_POPUP_CLICK_CTA',
  WEB_PLP_CEKPELUANG_POPUP_CLICK_CLOSE = 'WEB_PLP_CEKPELUANG_POPUP_CLICK_CLOSE',
  WEB_PLP_PELUANGMUDAH_POPUP_CLICK_CTA = 'WEB_PLP_PELUANGMUDAH_POPUP_CLICK_CTA',
  WEB_PLP_PELUANGMUDAH_POPUP_CLICK_CLOSE = 'WEB_PLP_PELUANGMUDAH_POPUP_CLICK_CLOSE',
  WEB_PLP_PELUANGSULIT_POPUP_CLICK_CTA_1 = 'WEB_PLP_PELUANGSULIT_POPUP_CLICK_CTA_1',
  WEB_PLP_PELUANGSULIT_POPUP_CLICK_CTA_2 = 'WEB_PLP_PELUANGSULIT_POPUP_CLICK_CTA_2',
  WEB_PLP_PELUANGSULIT_POPUP_CLICK_CLOSE = 'WEB_PLP_PELUANGSULIT_POPUP_CLICK_CLOSE',
  WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK = 'WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK',
  WEB_PLP_FILTER_AGE_TOOLTIP_CLICK = 'WEB_PLP_FILTER_AGE_TOOLTIP_CLICK',
  WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK_NEXT = 'WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK_NEXT',
  WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK_CLOSE = 'WEB_PLP_FILTER_INCOME_TOOLTIP_CLICK_CLOSE',
  WEB_PLP_FILTER_AGE_TOOLTIP_CLICK_PREV = 'WEB_PLP_FILTER_AGE_TOOLTIP_CLICK_PREV',
  WEB_PLP_FILTER_AGE_TOOLTIP_CLICK_CLOSE = 'WEB_PLP_FILTER_AGE_TOOLTIP_CLICK_CLOSE',
  WEB_PDP_BUTTON_SHARE_CLICK = 'WEB_PDP_BUTTON_SHARE_CLICK',
  WEB_PDP_POPUP_SHARE_WA_CLICK = 'WEB_PDP_POPUP_SHARE_WA_CLICK',
  WEB_PDP_POPUP_SHARE_TWITTER_CLICK = 'WEB_PDP_POPUP_SHARE_TWITTER_CLICK',
  WEB_PDP_POPUP_SHARE_EMAIL_CLICK = 'WEB_PDP_POPUP_SHARE_EMAIL_CLICK',
  WEB_PDP_POPUP_SHARE_COPYLINK_CLICK = 'WEB_PDP_POPUP_SHARE_COPYLINK_CLICK',
  WEB_PDP_POPUP_SHARE_CLOSE = 'WEB_PDP_POPUP_SHARE_CLOSE',
  WEB_PDP_TEXT_DESCRIPTION_EXPAND_CLICK = 'WEB_PDP_TEXT_DESCRIPTION_EXPAND_CLICK',
  WEB_PDP_TEXT_DESCRIPTION_COLLAPSE_CLICK = 'WEB_PDP_TEXT_DESCRIPTION_COLLAPSE_CLICK',
  WEB_PDP_LIHAT_DETAIL_SPESIFIKASI_CLICK = 'WEB_PDP_LIHAT_DETAIL_SPESIFIKASI_CLICK',
  WEB_PDP_VARIANT_PRICELIST_CLICK = 'WEB_PDP_VARIANT_PRICELIST_CLICK',
  WEB_PDP_VARIANT_PRICE_CLICK_CTA = 'WEB_PDP_VARIANT_PRICE_CLICK_CTA',
  WEB_PDP_BANNER_PROMO_CLICK = 'WEB_PDP_BANNER_PROMO_CLICK',
  WEB_PDP_BANNER_PROMO_POPUP_CLOSE = 'WEB_PDP_BANNER_PROMO_POPUP_CLOSE',
  WEB_PDP_TAB_PHOTO_CLICK = 'WEB_PDP_TAB_PHOTO_CLICK',
  WEB_PDP_CAROUSEL_PHOTO_CLICK = 'WEB_PDP_CAROUSEL_PHOTO_CLICK',
  WEB_PDP_360_PHOTO_TOGGLE_ON = 'WEB_PDP_360_PHOTO_TOGGLE_ON',
  WEB_PDP_360_PHOTO_TOGGLE_OFF = 'WEB_PDP_360_PHOTO_TOGGLE_OFF',
  WEB_PDP_RECENTLY_VIEWED_CLICK = 'WEB_PDP_RECENTLY_VIEWED_CLICK',
  WEB_PDP_FAQ_CLICK_EXPAND = 'WEB_PDP_FAQ_CLICK_EXPAND',
  WEB_PDP_FAQ_CLICK_CLOSE = 'WEB_PDP_FAQ_CLICK_CLOSE',
  WEB_SEO_FOOTER_CLICK_EXPAND = 'WEB_SEO_FOOTER_CLICK_EXPAND',
  WEB_SEO_FOOTER_CLICK_CLOSE = 'WEB_SEO_FOOTER_CLICK_CLOSE',
  WEB_PTBC_FORM_VIEW = 'WEB_PTBC_FORM_VIEW',
  WEB_PTBC_FORM_BUTTON_KALKULASI_CLICK = 'WEB_PTBC_FORM_BUTTON_KALKULASI_CLICK',
  WEB_PTBC_FORM_BUTTON_COBA_IA_CLICK = 'WEB_PTBC_FORM_BUTTON_COBA_IA_CLICK',
  WEB_PTBC_OTP_VERIFICATION_VIEW = 'WEB_PTBC_OTP_VERIFICATION_VIEW',
  WEB_PTBC_OTP_SUCCESS_VIEW = 'WEB_PTBC_OTP_SUCCESS_VIEW',
  WEB_PTBC_IA_YUKMULAI_VIEW = 'WEB_PTBC_IA_YUKMULAI_VIEW',
  WEB_PTBC_IA_STAGE_1_COMPLETE = 'WEB_PTBC_IA_STAGE_1_COMPLETE',
  WEB_PTBC_IA_STAGE_2_COMPLETE = 'WEB_PTBC_IA_STAGE_2_COMPLETE',
  WEB_PTBC_IA_STAGE_3_COMPLETE = 'WEB_PTBC_IA_STAGE_3_COMPLETE',
  WEB_PDP_VARIANT_PRICE_CHANGE_LAYOUT = 'WEB_PDP_VARIANT_PRICE_CHANGE_LAYOUT',
  WEB_PDP_PROMO_LIHAT_SEMUA_CLICK = 'WEB_PDP_PROMO_LIHAT_SEMUA_CLICK',
  WEB_LEADS_FORM_SUBMIT = 'WEB_LEADS_FORM_SUBMIT',
  WEB_LEADS_FORM_OPEN = 'WEB_LEADS_FORM_OPEN',
  WEB_LEADS_FORM_CLOSE = 'WEB_LEADS_FORM_CLOSE',
  WEB_LEADS_FORM_SUCCESS = 'WEB_LEADS_FORM_SUCCESS',
  WEB_PDP_CAROUSEL_PHOTO_SWIPE = 'WEB_PDP_CAROUSEL_PHOTO_SWIPE',
  WEB_PDP_GALLERY_MAIN_PHOTO_SWIPE = 'WEB_PDP_GALLERY_MAIN_PHOTO_SWIPE',
  WEB_PDP_GALLERY_MAIN_PHOTO_CLICK = 'WEB_PDP_GALLERY_MAIN_PHOTO_CLICK',
  WEB_RAFFLE_ZENIX_LANDING_PAGE_VIEW = 'WEB_RAFFLE_ZENIX_LANDING_PAGE_VIEW',
  WEB_RAFFLE_ZENIX_LANDING_PAGE_CLICK_CTA = 'WEB_RAFFLE_ZENIX_LANDING_PAGE_CLICK_CTA',
  WEB_RAFFLE_ZENIX_FORM_PAGE_VIEW = 'WEB_RAFFLE_ZENIX_FORM_PAGE_VIEW',
  WEB_RAFFLE_ZENIX_FORM_SUBMIT = 'WEB_RAFFLE_ZENIX_FORM_SUBMIT',
  WEB_RAFFLE_ZENIX_SUCCESS_PAGE_VIEW = 'WEB_RAFFLE_ZENIX_SUCCESS_PAGE_VIEW',
  WEB_RAFFLE_ZENIX_SUCCESS_PAGE_CLICK_CTA = 'WEB_RAFFLE_ZENIX_SUCCESS_PAGE_CLICK_CTA',
  WEB_BURGER_MENU_OPEN = 'WEB_BURGER_MENU_OPEN',
  WEB_BURGER_MENU_CLICK = 'WEB_BURGER_MENU_CLICK',
  WEB_SEARCHBAR_OPEN = 'WEB_SEARCHBAR_OPEN',
  WEB_PROFILE_AKUN_SAYA_CLICK = 'WEB_PROFILE_AKUN_SAYA_CLICK',
  WEB_CITYSELECTOR_OPEN = 'WEB_CITYSELECTOR_OPEN',
  WEB_CITYSELECTOR_CANCEL = 'WEB_CITYSELECTOR_CANCEL',
  WEB_CITYSELECTOR_APPLY = 'WEB_CITYSELECTOR_APPLY',
  WEB_FOOTER_CLICK = 'WEB_FOOTER_CLICK',
  WEB_LP_EDOC_CONSENT_BOX_AGREE_CLICK = 'WEB_LP_EDOC_CONSENT_BOX_AGREE_CLICK',
  WEB_LP_EDOC_CONSENT_BOX_CLOSE = 'WEB_LP_EDOC_CONSENT_BOX_CLOSE',
  WEB_LP_EDOC_VIEW = 'WEB_LP_EDOC_VIEW',
  WEB_LC_CAR_RECOMMENDATION_CLICK = 'WEB_LC_CAR_RECOMMENDATION_CLICK',
  WEB_LC_CAR_RECOMMENDATION_CTA_CLICK = 'WEB_LC_CAR_RECOMMENDATION_CTA_CLICK',
  WEB_LC_ARTICLE_CLICK = 'WEB_LC_ARTICLE_CLICK',
  WEB_LC_ALL_ARTICLE_CLICK = 'WEB_LC_ALL_ARTICLE_CLICK',
  WEB_LC_CTA_HITUNG_KEMAMPUAN_CLICK = 'WEB_LC_CTA_HITUNG_KEMAMPUAN_CLICK',
  WEB_LC_CTA_KUALIFIKASI_KREDIT_CLICK = 'WEB_LC_CTA_KUALIFIKASI_KREDIT_CLICK',
  WEB_LC_KUALIFIKASI_KREDIT_TOOLTIP_CTA_CLICK = 'WEB_LC_KUALIFIKASI_KREDIT_TOOLTIP_CTA_CLICK',
  WEB_LC_KUALIFIKASI_KREDIT_TOOLTIP_CTA_CLOSE = 'WEB_LC_KUALIFIKASI_KREDIT_TOOLTIP_CTA_CLOSE',
  WEB_LC_KUALIFIKASI_KREDIT_POP_UP_CTA_CLICK = 'WEB_LC_KUALIFIKASI_KREDIT_POP_UP_CTA_CLICK',
  WEB_LC_KUALIFIKASI_KREDIT_POP_UP_CLOSE = 'WEB_LC_KUALIFIKASI_KREDIT_POP_UP_CLOSE',
  WEB_LC_CTA_WA_DIRECT_CLICK = 'WEB_LC_CTA_WA_DIRECT_CLICK',
  WEB_LOGIN_PAGE_SUCCESS = 'WEB_LOGIN_PAGE_SUCCESS',
  WEB_OTP_RESEND_CLICK = 'WEB_OTP_RESEND_CLICK',
  WEB_OTP_CLOSE = 'WEB_OTP_CLOSE',
  WEB_LOGIN_PAGE_CTA_CLICK = 'WEB_LOGIN_PAGE_CTA_CLICK',
  WEB_REGISTRATION_PAGE_CTA_CLICK = 'WEB_REGISTRATION_PAGE_CTA_CLICK',
  WEB_DELETE_ACCOUNT_PAGE_VIEW = 'WEB_DELETE_ACCOUNT_PAGE_VIEW',
  WEB_DELETE_ACCOUNT_REASON_PAGE_VIEW = 'WEB_DELETE_ACCOUNT_REASON_PAGE_VIEW',
  WEB_DELETE_ACCOUNT_SUCCESS_PAGE_VIEW = 'WEB_DELETE_ACCOUNT_SUCCESS_PAGE_VIEW',
  WEB_PROFILE_PAGE_SAVE_CHANGES = 'WEB_PROFILE_PAGE_SAVE_CHANGES',
  WEB_PROFILE_PAGE_LOGOUT_CLICK = 'WEB_PROFILE_PAGE_LOGOUT_CLICK',
  WEB_PROFILE_PAGE_SAVE_KTP_CHANGES = 'WEB_PROFILE_PAGE_SAVE_KTP_CHANGES',
  WEB_PROFILE_PAGE_DELETE_ACCOUNT_ENTRY_POINT_CLICK = 'WEB_PROFILE_PAGE_DELETE_ACCOUNT_ENTRY_POINT_CLICK',
  WEB_DELETE_ACCOUNT_CONSENT_PAGE_CTA_CLICK = 'WEB_DELETE_ACCOUNT_CONSENT_PAGE_CTA_CLICK',
  WEB_DELETE_ACCOUNT_REASON_PAGE_CTA_CLICK = 'WEB_DELETE_ACCOUNT_REASON_PAGE_CTA_CLICK',
  WEB_DELETE_ACCOUNT_POPUP_CTA_CANCEL_CLICK = 'WEB_DELETE_ACCOUNT_POPUP_CTA_CANCEL_CLICK',
  WEB_DELETE_ACCOUNT_POPUP_CTA_YES_CLICK = 'WEB_DELETE_ACCOUNT_POPUP_CTA_YES_CLICK',
  WEB_DELETE_ACCOUNT_POPUP_CLOSE = 'WEB_DELETE_ACCOUNT_POPUP_CLOSE',
  WEB_DELETE_ACCOUNT_SUCCESS_CTA_CLICK = 'WEB_DELETE_ACCOUNT_SUCCESS_CTA_CLICK',
  WEB_PAGE_DIRECTION_WIDGET_CTA_CLICK = 'WEB_PAGE_DIRECTION_WIDGET_CTA_CLICK',
  WEB_KUALIFIKASI_KREDIT_FORM_PAGE_VIEW = 'WEB_KUALIFIKASI_KREDIT_FORM_PAGE_VIEW',
  WEB_KUALIFIKASI_KREDIT_REVIEW_PAGE_VIEW = 'WEB_KUALIFIKASI_KREDIT_REVIEW_PAGE_VIEW',
  WEB_KUALIFIKASI_KREDIT_REVIEW_PAGE_CTA_CLICK = 'WEB_KUALIFIKASI_KREDIT_REVIEW_PAGE_CTA_CLICK',
  WEB_KUALIFIKASI_KREDIT_CARI_MOBIL_CTA_CLICK = 'WEB_KUALIFIKASI_KREDIT_CARI_MOBIL_CTA_CLICK',
  WEB_KUALIFIKASI_KREDIT_UPLOAD_KTP_CLICK = 'WEB_KUALIFIKASI_KREDIT_UPLOAD_KTP_CLICK',
  WEB_KUALIFIKASI_KREDIT_FORM_PAGE_CTA_CLICK = 'WEB_KUALIFIKASI_KREDIT_FORM_PAGE_CTA_CLICK',
  WEB_KUALIFIKASI_KREDIT_CAR_DETAIL_CLICK = 'WEB_KUALIFIKASI_KREDIT_CAR_DETAIL_CLICK',
  WEB_KUALIFIKASI_KREDIT_CAR_DETAIL_CLOSE = 'WEB_KUALIFIKASI_KREDIT_CAR_DETAIL_CLOSE',
  WEB_KUALIFIKASI_KREDIT_WAITING_RESULT_PAGE_VIEW = 'WEB_KUALIFIKASI_KREDIT_WAITING_RESULT_PAGE_VIEW',
  WEB_KUALIFIKASI_KREDIT_SUCCESS_RESULT_PAGE_VIEW = 'WEB_KUALIFIKASI_KREDIT_SUCCESS_RESULT_PAGE_VIEW',
  WEB_KUALIFIKASI_KREDIT_REJECT_RESULT_PAGE_VIEW = 'WEB_KUALIFIKASI_KREDIT_REJECT_RESULT_PAGE_VIEW',
  WEB_KUALIFIKASI_KREDIT_DOWNLOAD_IOS_CLICK = 'WEB_KUALIFIKASI_KREDIT_DOWNLOAD_IOS_CLICK',
  WEB_KUALIFIKASI_KREDIT_DOWNLOAD_ANDROID_CLICK = 'WEB_KUALIFIKASI_KREDIT_DOWNLOAD_ANDROID_CLICK',
  WEB_KUALIFIKASI_KREDIT_WA_DIRECT_CLICK = 'WEB_KUALIFIKASI_KREDIT_WA_DIRECT_CLICK',
}

export type TrackingEventWebNavigation = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_NAVIGATION_MEREK_TOYOTA_CLICK
  | TrackingEventName.WEB_NAVIGATION_MEREK_DAIHATSU_CLICK
  | TrackingEventName.WEB_NAVIGATION_MEREK_BMW_CLICK
  | TrackingEventName.WEB_NAVIGATION_MEREK_ISUZU_CLICK
  | TrackingEventName.WEB_NAVIGATION_MEREK_PEUGEOT_CLICK
  | TrackingEventName.WEB_NAVIGATION_MEREK_ALL_CLICK
  | TrackingEventName.WEB_NAVIGATION_PROMO_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_BERITA_OTOMOTIF_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_REVIEW_MOBIL_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_TIPS_REKOMENDASI_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_KEUANGAN_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_ALL_CLICK
  | TrackingEventName.WEB_NAVIGATION_TENTANG_SEVA_CLICK
  | TrackingEventName.WEB_NAVIGATION_FACEBOOK_CLICK
  | TrackingEventName.WEB_NAVIGATION_INSTAGRAM_CLICK
  | TrackingEventName.WEB_NAVIGATION_TWITTER_CLICK
  | TrackingEventName.WEB_NAVIGATION_HUBUNGI_KAMI_CLICK
  | TrackingEventName.WEB_NAVIGATION_REFINANCING_CLICK
  | TrackingEventName.WEB_NAVIGATION_BELIMOBIL_CLICK
  | TrackingEventName.WEB_NAVIGATION_ARTICLE_CLICK
  | TrackingEventName.WEB_NAVIGATION_LAINNYA_CLICK
>

export type TrackingEventWebFooterNavigation = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_FOOTER_TENTANGKAMI
  | TrackingEventName.WEB_FOOTER_SYARATKETENTUAN
  | TrackingEventName.WEB_FOOTER_KEBIJAKANPRIVASI
  | TrackingEventName.WEB_FOOTER_HUBUNGIKAMI
>

export type TrackingEventWebPDPGalleryVideo = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_PDP_OPEN_VIDEO_POP_UP
  | TrackingEventName.WEB_PDP_PLAY_VIDEO
  | TrackingEventName.WEB_PDP_CLOSE_VIDEO_POP_UP
>

export type TrackingEventWebPDPPhoto = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_PDP_360_PHOTO_TOGGLE_OFF
  | TrackingEventName.WEB_PDP_360_PHOTO_TOGGLE_ON
  | TrackingEventName.WEB_PDP_TAB_PHOTO_CLICK
  | TrackingEventName.WEB_PDP_CAROUSEL_PHOTO_CLICK
  | TrackingEventName.WEB_PDP_CAROUSEL_PHOTO_SWIPE
  | TrackingEventName.WEB_PDP_GALLERY_MAIN_PHOTO_SWIPE
  | TrackingEventName.WEB_PDP_GALLERY_MAIN_PHOTO_CLICK
>

export type TrackingExpandFAQ = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_PDP_FAQ_CLICK_CLOSE
  | TrackingEventName.WEB_PDP_FAQ_CLICK_EXPAND
>

export type TrackingExpandSEOFooter = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_SEO_FOOTER_CLICK_CLOSE
  | TrackingEventName.WEB_SEO_FOOTER_CLICK_EXPAND
>

export type TrackingEventPLPSortShow = PickEnum<
  TrackingEventName,
  TrackingEventName.WEB_PLP_SORT_OPEN | TrackingEventName.WEB_PLP_SORT_CLOSE
>

export type TrackingEventPLPFilterShow = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_PLP_FILTER_CLICK
  | TrackingEventName.WEB_PLP_FILTER_CLOSE
>

export type TrackingEventLeadsForm = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_LEADS_FORM_CLOSE
  | TrackingEventName.WEB_LEADS_FORM_OPEN
  | TrackingEventName.WEB_LEADS_FORM_SUBMIT
  | TrackingEventName.WEB_LEADS_FORM_SUCCESS
>

export type TrackingEventSearchWidgetExpand = PickEnum<
  TrackingEventName,
  | TrackingEventName.WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_EXPAND
  | TrackingEventName.WEB_LP_SEARCHWIDGET_FILTER_FINANSIAL_COLLAPSE
>
