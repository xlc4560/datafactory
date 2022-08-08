import { defineStore } from 'pinia';
import { apiInfoType, inputParameterDataType } from '@/pages/apiRegisterAndUpdate/dataType';
const useApiRegisterAndUpdateStore = defineStore('useApiRegisterAndUpdateStore', {
  state: () => ({
    apiInfo: ref<apiInfoType>({
      apiBasic: {
        apiType: '',
        apiName: '',
        apiSource: '',
        apiDescription: '',
        apiProtocol: null,
        apiIpPort: '',
        apiPath: '',
        apiMethod: null,
        apiTimeout: null,
      },
      inputParameters: [],
      requestBody: [],
      responseBody: [],
    }),
    currentParameter: ref<inputParameterDataType>(),
  }),
});
export default useApiRegisterAndUpdateStore;
