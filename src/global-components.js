// app components
import AppButton from '@/components/app/AppButton'
import AppNav from '@/components/app/AppNav'

const useGlobalComponents = (app) => {
  app
    // app components
    .component('AppButton', AppButton)
    .component('AppNav', AppNav)
}

export default useGlobalComponents
