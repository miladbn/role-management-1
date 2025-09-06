import {
  IconChecklist,
  IconLayoutDashboard,
  IconPackages,
  IconPalette,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'جواد شجاع',
    email: 'ijbrave@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'مدیریت',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'شرکت acme',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'گروه acme',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'عمومی',
      items: [
        {
          title: 'نمای کلی',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'تسک ها',
          url: '/tasks',
          icon: IconChecklist,
        },
        {
          title: 'برنامه ها',
          url: '/apps',
          icon: IconPackages,
        },

        {
          title: 'کاربران',
          url: '/users',
          icon: IconUsers,
        },
      ],
    },

    {
      title: 'دیگر',
      items: [
        {
          title: 'تنظیمات',
          icon: IconSettings,
          items: [
            {
              title: 'ظاهر',
              url: '/settings/appearance',
              icon: IconPalette,
            },
          ],
        },
      ],
    },
  ],
}
