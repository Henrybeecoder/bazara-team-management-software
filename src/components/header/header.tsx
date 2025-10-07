'use client'
import { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Search, Menu, X } from 'react-feather'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '@/assets/images/logo.svg'
import notificationIcon from '@/assets/icons/headerIcons/notification-icon.svg'
import appIcon from '@/assets/icons/headerIcons/app-icon.svg'
import profileIcon from '@/assets/icons/headerIcons/profile-icon.svg'
import Input from '../input/input'

interface MenuItem {
  id: string
  label: string
}

interface IconItem {
  id: string
  src: StaticImageData
  alt: string
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'workbench', label: 'Workbench' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'service-catalogue', label: 'Service Catalogue' },
  { id: 'knowledge-management', label: 'Knowledge Management' },
  { id: 'admin-settings', label: 'Admin Settings' },
]

const iconItems: IconItem[] = [
  { id: 'notification', src: notificationIcon, alt: 'Notifications' },
  { id: 'app', src: appIcon, alt: 'Apps' },
  { id: 'profile', src: profileIcon, alt: 'Profile' },
]

export default function Header() {
  const [globalSearch, setGlobalSearch] = useState<string>('')
  const [activeMenuItem, setActiveMenuItem] = useState<string>('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGlobalSearch(e.target.value)
  }

  const handleMenuItemClick = (id: string): void => {
    setActiveMenuItem(id)
  }

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center gap-4 md:flex-shrink-0">
          <button 
            className="md:hidden p-2"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>
          <Image 
            src={logo} 
            alt="Company Logo" 
            width={120} 
            height={40}
            priority
          />
        </div>

        <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
          <div className="w-60">
            <Input
              value={globalSearch}
              onChange={handleSearchChange}
              placeholder="Search for anything"
              icon={<Search size={18} color='#808080' />}
              height="40px"
              backgroundColor='#FCFCFD'
            />
          </div>
          
          <nav className="flex gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className={`px-3 py-2 text-[14px] font-[400] leading-[18px] transition-all duration-200 rounded-[4px] ${
                  activeMenuItem === item.id 
                    ? 'bg-[#E8EEFD] text-[#1659E6]' 
                    : 'text-[#333333] hover:bg-[#E8EEFD] hover:text-[#1659E6]'
                }`}
                onClick={() => handleMenuItemClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="mx-2 text-gray-300">|</div>
          <div className="flex items-center gap-2">
            {iconItems.map((icon) => (
              <div key={icon.id} className="p-2">
                <Image 
                  src={icon.src} 
                  alt={icon.alt}
                  width={24}
                  height={24}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <Image 
            src={profileIcon} 
            alt="Profile"
            width={24}
            height={24}
          />
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 w-full h-full"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <Image 
                  src={logo} 
                  alt="Company Logo" 
                  width={120} 
                  height={40}
                />
                <button 
                  onClick={toggleMobileMenu}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
               <Input
              value={globalSearch}
              onChange={handleSearchChange}
              placeholder="Search for anything"
              icon={<Search size={18} color='#808080' />}
              height="40px"
              backgroundColor='#FCFCFD'
            />
              </div>

              <nav className="space-y-2 mb-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full text-left px-3 py-3 text-[14px] font-[400] leading-[18px] transition-all duration-200 rounded-[4px] ${
                      activeMenuItem === item.id 
                        ? 'bg-[#E8EEFD] text-[#1659E6]' 
                        : 'text-[#333333] hover:bg-[#E8EEFD] hover:text-[#1659E6]'
                    }`}
                    onClick={() => {
                      handleMenuItemClick(item.id)
                      toggleMobileMenu()
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4 pt-4 border-t">
                {iconItems.map((icon) => (
                  <div key={icon.id} className="p-2">
                    <Image 
                      src={icon.src} 
                      alt={icon.alt}
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}