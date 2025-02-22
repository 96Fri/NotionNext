import React from 'react'
import { useGlobal } from '@/lib/global'
import CONFIG_HEXO from '../config_hexo'
import BLOG from '@/blog.config'
import { MenuItemDrop } from './MenuItemDrop'

export const MenuListTop = (props) => {
  const { customNav, customMenu } = props
  const { locale } = useGlobal()

  let links = [
    { icon: 'fa-solid fa-house', name: locale.NAV.INDEX, to: '/', show: CONFIG_HEXO.MENU_INDEX },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG_HEXO.MENU_SEARCH },
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG_HEXO.MENU_ARCHIVE }
    // { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG_HEXO.MENU_CATEGORY },
    // { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG_HEXO.MENU_TAG }
  ]

  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (BLOG.CUSTOM_MENU) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  return (<>
        <nav id='nav-mobile' className='leading-8 justify-center font-light w-full flex'>
            {links?.map(link => link && link.show && <MenuItemDrop key={link.id} link={link} />)}
        </nav>
    </>)
}
