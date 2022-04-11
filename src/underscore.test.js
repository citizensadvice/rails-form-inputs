import { underscore } from './underscore';

// These tests come from rails
// https://github.com/rails/rails/blob/a76344ffc5a308e0ad6105fde921990f57fa0ea9/activesupport/test/inflector_test.rb#L194
// But have been updated to ignore mapping '::' to '/' and known acronyms
describe.each([
  ['API', 'api'],
  ['APIController', 'api_controller'],
  ['Nokogiri::HTML', 'nokogiri::html'],
  ['HTTPAPI', 'httpapi'],
  ['HTTP::Get', 'http::get'],
  ['SSLError', 'ssl_error'],
  ['RESTful', 'res_tful'],
  ['RESTfulController', 'res_tful_controller'],
  ['Nested::RESTful', 'nested::res_tful'],
  ['IHeartW3C', 'i_heart_w3_c'],
  ['PhDRequired', 'ph_d_required'],
  ['IRoRU', 'i_ro_ru'],
  ['RESTfulHTTPAPI', 'res_tful_httpapi'],
  ['HTTP::RESTful', 'http::res_tful'],
  ['HTTP::RESTfulAPI', 'http::res_tful_api'],
  ['APIRESTful', 'apires_tful'],
  ['Capistrano', 'capistrano'],
  ['CapiController', 'capi_controller'],
  ['HttpsApis', 'https_apis'],
  ['Html5', 'html5'],
  ['Restfully', 'restfully'],
  ['RoRails', 'ro_rails'],
])('underscore(%p, %p)', (a, b) => {
  it('snake cases', () => {
    expect(underscore(b)).toEqual(b);
    expect(underscore(a)).toEqual(b);
  });
});

// inflect.acronym("API")
// inflect.acronym("HTML")
// inflect.acronym("HTTP")
// inflect.acronym("RESTful")
// inflect.acronym("W3C")
// inflect.acronym("PhD")
// inflect.acronym("RoR")
// inflect.acronym("SSL")
//  @acronym_regex = @acronyms.empty? ? /(?=a)b/ : /#{@acronyms.values.join("|")}/
// @acronyms_camelize_regex   = /^(?:#{@acronym_regex}(?=\b|[A-Z_])|\w)/
// @acronyms_underscore_regex = /(?:(?<=([A-Za-z\d]))|\b)(#{@acronym_regex})(?=\b|[^a-z])/
