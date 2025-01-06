import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

const Adminlayout = () => {
  return (
    <div style={styles.layout}>
        <AdminNavbar />
        <div style={styles.content}>
            <Outlet />
        </div>

    </div>
  )
}

const styles={
    layout:{
        display:'flex',
        flexDirection:'row'
    },
    content:{
        flex: 1,
        paddingBottom: '4rem',
    }
}

export default Adminlayout