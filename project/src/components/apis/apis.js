import axios from 'axios'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  // user endpoint
  login: (data) => axios.post(`${process.env.REACT_APP_API_HOST}auth/token/request`, data),
  detailUser: () => axios.get(`${process.env.REACT_APP_API_HOST}auth/token/detail`),
  refreshToken: () => axios.post(`${process.env.REACT_APP_API_HOST}auth/token/refresh`),
  logout: () => axios.get(`${process.env.REACT_APP_API_HOST}auth/token/revoke`),

  //get task
  getTaskByUserId: (user_id) => axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/by-user?user_id=${user_id}`),
  getTaskByTaskId: (task_id)=> axios.get(`${process.env.REACT_APP_API_JOBCARD}/task?task_id=${task_id}`),
  getAllTaskByPerson: () => axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-user`),
  getAllTaskByUnit: () => axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/each-unit`), 

  //patch favorit task
  patchFavTask: (data) => axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/favorite`, data),

  //create, edit, task
  createTask : (data) => axios.post(`${process.env.REACT_APP_API_JOBCARD}/task`, data),
  updateTaskUser : (data) => axios.post(`${process.env.REACT_APP_API_JOBCARD}/activity`, data),
  editTaskAdmin : (task_id,data) => axios.post(`${process.env.REACT_APP_API_JOBCARD}/task/${task_id}`, data)

  // reset password
  // {phone}
//   getOtp: (credentials) => axios.post('auth/otp/generate', credentials),
  // {phone,token}
//   verifOtp: (credentials) => axios.post('auth/otp/verification', credentials),
  // {phone,password}
//   changePassword: (data) => axios.post('auth/otp/change_password', data),

  // list data endpoint
//   listUnit: () => axios.get('cms/unit/get'),
//   listDirektorat: () => axios.get('cms/direktorat/get'),
//   listSubUnit: () => axios.get('cms/subunit/get'),
//   listPosition: () => axios.get('cms/position/get'),

  // inforekan
//   getAllKaryawan: () => axios.get('cms/user/get'),
//   getProfile: (params) => axios.get('cms/user/detail', params),
//   getProfileById: (id) => axios.get(`cms/user/get?id=${id}`),
//   uploadFileKaryawan: (data, handlerProgress) =>
//     axios.post('cms/user/upload', data, handlerProgress),

  // list jabatan
//   getJabatan: () => axios.get('cms/jobprefix/get'),

};
