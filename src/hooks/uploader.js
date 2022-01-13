import axios from 'axios'

const uploader = () => {
  const validate = (obj, notRequiredList) => {
    for (const [key, value] of Object.entries(obj)) {
      if (!value && notRequiredList.indexOf(key) === -1) return false
    }

    return true
  }

  const callApi = async (route, params, notRequiredList, callback) => {
    if (validate(params, notRequiredList)) {
      const { status } = await axios.post(`${process.env.VUE_APP_NODE_URL}/api/${route}`, params)

      if (status === 200) {
        alert('Completed')
        if (callback) callback()
      } else {
        alert('Error')
      }
    } else {
      alert('Required Check')
    }
  }

  return {
    callApi,
  }
}

export default uploader
