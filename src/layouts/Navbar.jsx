import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Menu } from 'semantic-ui-react'

export default function Navbar({ isUserLoggedIn }) {
  const [activeItem, setActiveItem] = useState("Anasayfa")

  const handleItemClick = (e, { name }) => setActiveItem({ activeItem: name })

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  }

    return (
      <Menu size='medium' fixed='top'>
        <Link to={"/"}>
        <Menu.Item
          name='Anasayfa'
          active={activeItem === 'Anasayfa'}
          onClick={handleItemClick}
        />
        </Link>
        <Link to={"/reports"}>
        <Menu.Item
          name='Raporlar'
          active={activeItem === 'Raporlar'}
          onClick={handleItemClick}
        />
        </Link>

        <Menu.Menu position='right'>
          <Menu.Item>
            {
              isUserLoggedIn ? <Button color='red' onClick={handleSignOut}>Çıkış Yap</Button> : <Link to={"/login"}><Button primary>Giriş Yap</Button></Link>
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
}