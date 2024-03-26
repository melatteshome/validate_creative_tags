// Improperly formatted JSON string
const adScriptContent = `
{
    "game_key": "9f91161f43433ef7/9a6de6db680d70b6",
    "lorenzo_id": "06210588-063d-4f36-ac44-53b265487380",
    "region": "eu-west-1",
    "environment": "MWEB",
    "service_level": "managed",
    "width": 320,
    "height": 480,
    "redirect_urls": [
    "%%TTD_CLK%%https://www.ocado.com/products/wash-with-leaf-non-bio-laundry-sheets-25-600151011"
    ],
    "third_party_engagement": [],
    "dsp": "TTD",
    "ttd_imp_aud_user_ttl_min": "86400",
    "ttd_adformat": "%%TTD_ADFORMAT%%",
    "ttd_adgroupid": "%%TTD_ADGROUPID%%",
    "ttd_advertiserid": "%%TTD_ADVERTISERID%%",
    "ttd_all_categories": "%%TTD_ALL_CATEGORIES%%",
    "ttd_base_bid_override_metadata": "%%TTD_BASE_BID_OVERRIDE_METADATA%%",
    "ttd_campaignid": "%%TTD_CAMPAIGNID%%",
    "ttd_category": "%%TTD_CATEGORY%%",
    "ttd_city": "%%TTD_CITY%%",
    "ttd_country": "%%TTD_COUNTRY%%",
    "ttd_creativeid": "%%TTD_CREATIVEID%%",
    "ttd_dealid": "%%TTD_DEALID%%",
    "ttd_deviceosfamily": "%%TTD_DEVICEOSFAMILY%%",
    "ttd_devicetype": "%%TTD_DEVICETYPE%%",
    "ttd_devicemake": "%%TTD_DEVICEMAKE%%",
    "ttd_devicemodel": "%%TTD_DEVICEMODEL%%",
    "ttd_gdpr_applies": "%%TTD_GDPR_APPLIES%%",
    "ttd_gdpr_consent_strinG": "%%TTD_GDPR_CONSENT_STRING%%",
    "ttd_impressionid": "%%TTD_IMPRESSIONID%%",
    "ttd_language": "%%TTD_LANGUAGE%%",
    "ttd_metro": "%%TTD_METRO%%",
    "ttd_partnerid": "%%TTD_PARTNERID%%",
    "ttd_privatecontractid": "%%TTD_PRIVATECONTRACTID%%",
    "ttd_publisherid": "%%TTD_PUBLISHERID%%",
    "ttd_region": "%%TTD_REGION%%",
    "ttd_rendering_context": "%%TTD_RENDERING_CONTEXT%%",
    "ttd_site": "%%TTD_SITE%%",
    "ttd_site_with_path": "%%TTD_SITE_WITH_PATH%%",
    "ttd_supplyvendor": "%%TTD_SUPPLYVENDOR%%",
    "ttd_tdid": "%%TTD_TDID%%",
    "ttd_trustesid": "%%TTD_TRUSTESID%%",
    "ttd_unix_timestamp": "%%TTD_UNIX_TIMESTAMP%%",
    "ttd_zipcode": "%%TTD_ZIPCODE%%"
    }
`;

// Function to fix the JSON formatting
export function fixJSONFormat(jsonString) {
    // Replace line breaks and excessive whitespace with a single space
    const cleanString = jsonString.replace(/\s+/g, ' ');
  
    // Parse the cleaned string into an object
    const jsonObject = JSON.parse(cleanString);
  
    // Stringify the object with proper indentation
    const formattedJSON = JSON.stringify(jsonObject, null, 2);
  
    return formattedJSON;
  }


// Convert the improperly formatted JSON string to the correct format
const fixedScriptContent = fixJSONFormat(adScriptContent);

// Export the properly formatted JSON
export default fixedScriptContent;
