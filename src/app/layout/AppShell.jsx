import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const AppShell = () => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background:'var(--bg-base)' }}>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, overflow:'hidden' }}>
        <TopBar onMenuClick={() => setOpen(true)} />
        <main style={{ flex:1, overflowY:'auto', padding:'28px 32px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
