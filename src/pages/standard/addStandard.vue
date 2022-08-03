<template>
  <a-form :model="formStateAdd" name="basic" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }" autocomplete="off" @finish="onFinish" @finish-failed="onFinishFailed">
    <a-form-item label="中文名称" name="standardCnName" :rules="[{ required: true, message: '请输入标准中文名称!' }]">
      <a-input v-model:value="formStateAdd.standardCnName" />
    </a-form-item>

    <a-form-item label="英文名称" name="standardEnName" :rules="[{ required: true, message: '请输入标准英文名称!' }]">
      <a-input v-model:value="formStateAdd.standardEnName" />
    </a-form-item>

    <a-form-item label="标准说明" name="standardExplain" :rules="[{ required: false, message: '请输入标准说明!' }]">
      <a-input v-model:value="formStateAdd.standardExplain" />
    </a-form-item>

    <a-form-item label="来源机构" name="standardSourceOrganization" :rules="[{ required: true, message: '请选择来源机构!' }]">
      <a-input v-model:value="formStateAdd.standardSourceOrganization" />
    </a-form-item>

    <a-form-item label="是否为空" name="standardIsBlank" :rules="[{ required: true, message: '请选择是否为空!' }]">
      <!-- <a-input v-model:value="formState.iskong" /> -->
      <a-select v-model:value="formStateAdd.standardIsBlank" placeholder="请选择是否为空" :options="optionsEmpty" @change="handleChangeEmpty"></a-select>
    </a-form-item>

    <a-form-item label="数据类型" name="standardType" :rules="[{ required: true, message: 'Please input your username!' }]">
      <!-- <a-input v-model:value="formState.type" /> -->
      <a-select v-model:value="formStateAdd.standardType" placeholder="请选择" :options="optionsType" @change="handleChangeType"></a-select>
    </a-form-item>
    <!-- Int类型 -->
    <div v-if="formStateAdd.standardType == 0">
      <a-form-item label="取值范围" name="standardValueMin" :rules="[{ required: false, message: '请输入!' }]">
        <div style="display: flex; justify-content: space-around; padding: 0">
          <a-input v-model:value="formStateAdd.standardValueMin" style="width: 160px; height: 32.19px" />
          <!-- <a-input v-model:value="formStateAdd.max" style="width: 200px" /> -->
          <a-form-item name="standardValueMax" :rules="[{ required: false, message: '请输入!' }]">
            <a-input v-model:value="formStateAdd.standardValueMax" style="width: 160px" />
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- Enum类型 -->
    <div v-else-if="formStateAdd.standardType == 1">
      <a-form-item label="枚举范围" name="codeId" :rules="[{ required: false, message: '请输入!' }]">
        <!-- <a-input v-model:value="formStateAdd.standardDataAccuracy" /> -->
        <a-select v-model:value="formStateAdd.codeId" mode="combobox" style="width: 100%" placeholder="请选择" :options="options" @change="handleChange"></a-select>
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- Float类型 -->
    <div v-else-if="formStateAdd.standardType == 2">
      <a-form-item
        label="数据精度"
        name="standardDataAccuracy"
        :rules="[
          { required: false, message: '请输入!' },
          { pattern: /^[1-9]\d*|0$/, message: '请输入正整数!' },
        ]"
      >
        <a-input v-model:value="formStateAdd.standardDataAccuracy" />
      </a-form-item>
      <a-form-item label="取值范围" name="standardValueMin" :rules="[{ required: false, message: '请输入!' }]">
        <div style="display: flex; justify-content: space-around; padding: 0">
          <a-input v-model:value="formStateAdd.standardValueMin" style="width: 160px; height: 32.19px" />
          <!-- <a-input v-model:value="formStateAdd.max" style="width: 200px" /> -->
          <a-form-item name="standardValueMax" :rules="[{ required: false, message: '请输入!' }]">
            <a-input v-model:value="formStateAdd.standardValueMax" style="width: 160px" />
          </a-form-item>
        </div>
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>
    <!-- String类型 -->
    <div v-else-if="formStateAdd.standardType == 3">
      <a-form-item
        label="数据长度"
        name="standardDataLength"
        :rules="[
          { required: false, message: '请输入!' },
          { pattern: /^[1-9]\d*|0$/, message: '请输入正整数!' },
        ]"
      >
        <a-input v-model:value="formStateAdd.standardDataLength" />
      </a-form-item>
      <a-form-item label="默认值" name="standardDefault" :rules="[{ required: false, message: '请输入!' }]">
        <a-input v-model:value="formStateAdd.standardDefault" />
      </a-form-item>
    </div>

    <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import type { SelectProps } from 'ant-design-vue';
  import { formStateAdd, optionsEmpty, optionsType } from './standardData'; //新增数据、是否为空选择、类型选择
  // import {} from './standardType'; //
  import { standardAdd, standardUpdateStandard, standardDetail, codeSWelectReleaseList } from '@/api/standard/standard'; //新增，编辑,详情,枚举范围
  const prop = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    codeid: {
      type: String,
      default: '',
    },
  });
  console.log('prop' + prop.codeid);
  const val = ref();
  val.value = prop.visible || false;
  const emit = defineEmits(['visible']);
  const onClose = () => {
    val.value = false;
    emit('visible', val.value);

    console.log('关闭');
  };

  // 编辑获取详情
  if (prop.codeid != 'new') {
    standardDetail(prop.codeid).then(res => {
      console.log(res);
      formStateAdd.standardCode = res.standardCode;
      formStateAdd.standardCnName = res.standardCnName; //中文名称
      formStateAdd.standardDataAccuracy = res.standardDataAccuracy; //数据精度
      formStateAdd.standardDataLength = res.standardDataLength; //数据长度
      formStateAdd.standardDefault = res.standardDefault; //默认值
      formStateAdd.standardEnName = res.standardEnName; //英文名称
      formStateAdd.standardExplain = res.standardExplain; //标准说明
      formStateAdd.standardIsBlank = res.standardIsBlank; //是否可为空：0不可为空，1可为空
      formStateAdd.standardSourceOrganization = res.standardSourceOrganization; //来源机构编码
      formStateAdd.standardState = res.standardState; //标准状态  0：未发布，1：已发布，2：已停用
      formStateAdd.standardType = res.standardType; //数据类型（0：int，1：enum，2：float，3：String）
      formStateAdd.standardValueMax = res.standardValueMax; //取值范围-最大值
      formStateAdd.standardValueMin = res.standardValueMin; //取值范围-最小值
      if (res.standardType == 1) {
        // formStateAdd.codeName = res.code.codeName; //码表名称
        formStateAdd.codeId = res.code.codeId; //码表编号
      }
    });
  } else if (prop.codeid == 'new') {
    formStateAdd.standardCnName = ''; //中文名称
    formStateAdd.standardDataAccuracy = null; //数据精度
    formStateAdd.standardDataLength = null; //数据长度
    formStateAdd.standardDefault = ''; //默认值
    formStateAdd.standardEnName = ''; //英文名称
    formStateAdd.standardExplain = ''; //标准说明
    formStateAdd.standardIsBlank = ''; //是否可为空：0不可为空，1可为空
    formStateAdd.standardSourceOrganization = ''; //来源机构编码
    formStateAdd.standardState = ''; //标准状态  0：未发布，1：已发布，2：已停用
    formStateAdd.standardType = ''; //数据类型（0：int，1：enum，2：float，3：String）
    formStateAdd.standardValueMax = null; //取值范围-最大值
    formStateAdd.standardValueMin = null; //取值范围-最小值
    formStateAdd.codeId = null; //码表编号
  }

  // 提交
  const onFinish = (values: any) => {
    console.log('Success:', values);
    if (prop.codeid == 'new') {
      console.log('新增');
      // 新增
      standardAdd(values).then(res => {
        console.log(res);
        onClose();
      });
    } else {
      console.log('修改');
      // 修改
      console.log(formStateAdd);

      standardUpdateStandard(formStateAdd).then(res => {
        console.log(res);
        onClose();
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 下拉选择是否为空
  const handleChangeEmpty: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };
  //optionsType handleChangeType
  // 选择类型
  const handleChangeType: SelectProps['onChange'] = value => {
    console.log(value); // { key: "lucy", label: "Lucy (101)" }
  };

  // 枚举
  const options = reactive<any[]>([]);
  // const options = [...Array(25)].map((_, i) => ({ value: (i + 10).toString(36) + (i + 1) }));
  // console.log(options);

  // const value = ref([]);
  // 枚举范围
  codeSWelectReleaseList().then(res => {
    console.log(res);
    res.forEach((i: any) => {
      let t = {
        label: i.codeName,
        value: i.codeId,
      };
      options.push(t);
    });
    console.log(options);
  });
  const handleChange = (value: any) => {
    console.log(`selected ${value}`);
  };
</script>
<style scoped lang="less"></style>
