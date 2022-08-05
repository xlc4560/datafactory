import { defineStore } from 'pinia';
import { apiInfoType } from '@/pages/apiRegisterAndUpdate/dataType';
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
        apiTimeout: '',
      },
      parameters: [],
      responseBody: [],
    }),
  }),
});
export default useApiRegisterAndUpdateStore;
