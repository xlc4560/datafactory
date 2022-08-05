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
      requestBody: [
        // {
        //   parameterName: '12',
        //   parameterPosition: 0,
        //   parameterType: 2,
        //   parameterRequire: 0,
        //   parameterDefault: '12',
        //   parameterDescription: '1221',
        //   id: '564889415',
        //   parameterPid: '0',
        //   isEdit: false,
        // },
      ],
      responseBody: [
        // {
        //   parameterName: 'sadsa',
        //   parameterType: 3,
        //   parameterPosition: 3,
        //   parameterDescription: 'ajgbarjng',
        //   parameterRequire: 1,
        //   id: '13212323',
        //   parameterPid: '0',
        //   isEdit: false,
        // },
      ],
    }),
    currentParameter: ref<inputParameterDataType>(),
  }),
});
export default useApiRegisterAndUpdateStore;
