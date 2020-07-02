import { getServiceContainer } from '@/api/ServiceContainer'
import HttpUtil from '@/utils/HttpUtil'
import { NuxtContext } from 'vue/types/options'

export default async (context: NuxtContext, inject) => {

  HttpUtil.router = context.app.router

  const sc = getServiceContainer()
  await sc.initialize(context.store)

  inject('getServiceContainer', () => getServiceContainer())

}

