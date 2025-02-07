import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import CONFIG_NOBELIUM from '../config_nobelium'
import { SvgIcon } from './SvgIcon'
import { MenuItemDrop } from './MenuItemDrop'
import Collapse from '@/components/Collapse'
import { MenuItemCollapse } from './MenuItemCollapse'

const Nav = props => {
  const { navBarTitle, fullWidth, siteInfo } = props
  const useSticky = !BLOG.autoCollapsedNavBar
  const navRef = useRef(null)
  const sentinalRef = useRef([])
  const handler = ([entry]) => {
    if (navRef && navRef.current && useSticky) {
      if (!entry.isIntersecting && entry !== undefined) {
        navRef.current?.classList.add('sticky-nav-full')
      } else {
        navRef.current?.classList.remove('sticky-nav-full')
      }
    } else {
      navRef.current?.classList.add('remove-sticky')
    }
  }
  useEffect(() => {
    const obvserver = new window.IntersectionObserver(handler)
    obvserver.observe(sentinalRef.current)
    // Don't touch this, I have no idea how it works XD
    // return () => {
    //   if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sentinalRef])
  return <>
        <div className="observer-element h-4 md:h-12" ref={sentinalRef}></div>
        <div
            className={`sticky-nav m-auto w-full h-6 flex flex-row justify-between items-center mb-2 md:mb-12 py-8 bg-opacity-60 ${!fullWidth ? 'max-w-3xl px-4' : 'px-4 md:px-24'
                }`}
            id="sticky-nav"
            ref={navRef}
        >
            <div className="flex items-center">
                <Link href="/" aria-label={BLOG.title}>

                    <div className="h-6">
                        {/* <SvgIcon/> */}
                        {CONFIG_NOBELIUM.NAV_NOTION_ICON
                        /* eslint-disable-next-line @next/next/no-img-element */
                          ? <img src={siteInfo?.icon} width={24} height={24} alt={BLOG.AUTHOR} />
                          : <SvgIcon />}

                    </div>

                </Link>
                {navBarTitle
                  ? (
                        <p className="ml-2 font-medium text-gray-800 dark:text-gray-300 header-name">
                            {navBarTitle}
                        </p>
                    )
                  : (
                        <p className="ml-2 font-medium text-gray-800 dark:text-gray-300 header-name">
                            {siteInfo?.title}
                            {/* ,{' '}<span className="font-normal">{siteInfo?.description}</span> */}
                        </p>
                    )}
            </div>
            <NavBar {...props} />
        </div>
    </>
}

const NavBar = props => {
  const { customMenu, customNav } = props
  const [isOpen, changeOpen] = useState(false)
  const toggleOpen = () => {
    changeOpen(!isOpen)
  }
  const collapseRef = useRef(null)

  const { locale } = useGlobal()
  let links = [
    { id: 2, name: locale.NAV.RSS, to: '/feed', show: BLOG.ENABLE_RSS && CONFIG_NOBELIUM.MENU_RSS, target: '_blank' },
    { icon: 'fas fa-search', name: locale.NAV.SEARCH, to: '/search', show: CONFIG_NOBELIUM.MENU_SEARCH },
    { icon: 'fas fa-archive', name: locale.NAV.ARCHIVE, to: '/archive', show: CONFIG_NOBELIUM.MENU_ARCHIVE },
    { icon: 'fas fa-folder', name: locale.COMMON.CATEGORY, to: '/category', show: CONFIG_NOBELIUM.MENU_CATEGORY },
    { icon: 'fas fa-tag', name: locale.COMMON.TAGS, to: '/tag', show: CONFIG_NOBELIUM.MENU_TAG }
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

  return (
        <div className="flex-shrink-0">
            <ul className=" hidden md:flex flex-row">
                {links?.map(link => <MenuItemDrop key={link.id} link={link} />)}
            </ul>
            <div className='md:hidden'><i onClick={toggleOpen} className='fas fa-bars cursor-pointer px-5 block md:hidden'></i>
                <Collapse collapseRef={collapseRef} isOpen={isOpen} type='vertical' className='fixed top-16 right-6'>
                    <div className='dark:border-black bg-white dark:bg-black rounded border p-2 text-sm'>
                        {links?.map(link => <MenuItemCollapse key={link.id} link={link} onHeightChange={(param) => collapseRef.current?.updateCollapseHeight(param)}/>)}
                    </div>
                </Collapse>
            </div>
        </div>
  )
}

export default Nav
