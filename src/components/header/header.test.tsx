import { render, screen, fireEvent } from '@testing-library/react'
import Header from './header'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

jest.mock('framer-motion', () => ({
  motion: {
    div: (props: any) => <div {...props} />,
  },
  AnimatePresence: (props: any) => <div {...props} />,
}))

describe('Header', () => {
  it('renders desktop layout correctly', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search for anything')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Workbench')).toBeInTheDocument()
    expect(screen.getByText('Tickets')).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Header />)
    
    const hamburgerButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(hamburgerButton)
    
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument()
    
    const closeButton = screen.getByLabelText('Close menu')
    fireEvent.click(closeButton)
  })

  it('updates search input value', () => {
    render(<Header />)
    
    const searchInput = screen.getByPlaceholderText('Search for anything')
    fireEvent.change(searchInput, { target: { value: 'test search' } })
    
    expect(searchInput).toHaveValue('test search')
  })

  it('sets active menu item when clicked', () => {
    render(<Header />)
    
    const homeButton = screen.getByText('Home')
    fireEvent.click(homeButton)
    
    expect(homeButton).toHaveClass('bg-[#E8EEFD]', 'text-[#1659E6]')
  })

  it('closes mobile menu when menu item is clicked', () => {
    render(<Header />)
    
    const hamburgerButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(hamburgerButton)
    
    const homeButton = screen.getByText('Home')
    fireEvent.click(homeButton)
    
    expect(screen.queryByLabelText('Close menu')).not.toBeInTheDocument()
  })

  it('displays profile icon on mobile', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Profile')).toBeInTheDocument()
  })

  it('renders all menu items', () => {
    render(<Header />)
    
    const menuItems = [
      'Home', 'Workbench', 'Tickets', 'Service Catalogue', 
      'Knowledge Management', 'Admin Settings'
    ]
    
    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument()
    })
  })

  it('renders all icons', () => {
    render(<Header />)
    
    expect(screen.getByAltText('Notifications')).toBeInTheDocument()
    expect(screen.getByAltText('Apps')).toBeInTheDocument()
    expect(screen.getByAltText('Profile')).toBeInTheDocument()
  })
})