// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 32 32"><path fill="currentColor" d="M30 20a13.854 13.854 0 0 0-2.23-7.529l-1.444 1.445A11.892 11.892 0 0 1 28 20zM28 9.414L26.586 8l-8.567 8.567A3.952 3.952 0 0 0 16 16a4 4 0 1 0 4 4a3.953 3.953 0 0 0-.567-2.02zM16 22a2 2 0 1 1 2-2a2.002 2.002 0 0 1-2 2zm0-14a11.909 11.909 0 0 1 6.083 1.674l1.454-1.453A13.977 13.977 0 0 0 2 20h2A12.014 12.014 0 0 1 16 8z"/></svg>,
  database: <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 256 256"><path fill="currentColor" d="M128 24c-53.83 0-96 24.6-96 56v96c0 31.4 42.17 56 96 56s96-24.6 96-56V80c0-31.4-42.17-56-96-56Zm80 104c0 9.62-7.88 19.43-21.61 26.92C170.93 163.35 150.19 168 128 168s-42.93-4.65-58.39-13.08C55.88 147.43 48 137.62 48 128v-16.64c17.06 15 46.23 24.64 80 24.64s62.94-9.68 80-24.64ZM69.61 53.08C85.07 44.65 105.81 40 128 40s42.93 4.65 58.39 13.08C200.12 60.57 208 70.38 208 80s-7.88 19.43-21.61 26.92C170.93 115.35 150.19 120 128 120s-42.93-4.65-58.39-13.08C55.88 99.43 48 89.62 48 80s7.88-19.43 21.61-26.92Zm116.78 149.84C170.93 211.35 150.19 216 128 216s-42.93-4.65-58.39-13.08C55.88 195.43 48 185.62 48 176v-16.64c17.06 15 46.23 24.64 80 24.64s62.94-9.68 80-24.64V176c0 9.62-7.88 19.43-21.61 26.92Z"/></svg>,
  jobs: <svg xmlns="http://www.w3.org/2000/svg" width={36} viewBox="0 0 21 21"><defs><path id="systemUiconsDocumentJustified0" d="M16.5 15.5v-10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zm-9-8h6m-6 3h6m-6 3h6"/></defs><g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><use href="#systemUiconsDocumentJustified0"/><use href="#systemUiconsDocumentJustified0"/></g></svg>,
  candidates: <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="6" r="4"/><path stroke-linecap="round" stroke-linejoin="round" d="m17 10.3l1.333 1.2L21 8.5"/><path stroke-linecap="round" d="M18.997 18c.003-.164.003-.331.003-.5c0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S3 22 11 22c2.231 0 3.84-.157 5-.437"/></g></svg>,
  task: <svg xmlns="http://www.w3.org/2000/svg" width={22} viewBox="0 0 24 24"><path fill="currentColor" d="M2 22V4q0-.825.588-1.413T4 2h16q.825 0 1.413.588T22 4v12q0 .825-.588 1.413T20 18H6l-4 4Zm2-4.825L5.175 16H20V4H4v13.175ZM4 4v13.175V4Z"/></svg>,
  app: <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 16 16"><path fill="currentColor" d="M1.75 1.5a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h5.5v-13h-5.5Zm7 0v5.75h5.75v-5.5a.25.25 0 0 0-.25-.25h-5.5Zm5.75 7.25H8.75v5.75h5.5a.25.25 0 0 0 .25-.25v-5.5ZM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25V1.75Z"/></svg>,
  website: <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24"><path fill="currentColor" d="M6.75 6.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5H6.75ZM6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3H6.25ZM4.5 6.25c0-.966.784-1.75 1.75-1.75h11.5c.966 0 1.75.784 1.75 1.75v11.5a1.75 1.75 0 0 1-1.75 1.75H6.25a1.75 1.75 0 0 1-1.75-1.75V6.25Z"/></svg>,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    // subheader: 'general',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: 'Manage Jobs', path: PATH_DASHBOARD.general.jobs, icon: ICONS.jobs },
      { title: 'Database', path: PATH_DASHBOARD.general.database, icon: ICONS.database },
      {
        title: 'Candidate',
        path: PATH_DASHBOARD.candidate.root,
        icon: ICONS.candidates,
        children: [
          { title: 'View Candidates',
          path: PATH_DASHBOARD.general.candidates,
           }, { title: 'Add Candidate',
          path: PATH_DASHBOARD.candidate.new,
         
           },
        ],
      },
     ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
      subheader: 'app',
      items: [
        {
          title: 'mail',
          path: PATH_DASHBOARD.mail.root,
          icon: ICONS.mail,
          info: <Label color="error">+32</Label>,
        },
        {
          title: 'chat',
          path: PATH_DASHBOARD.chat.root,
          icon: ICONS.chat,
        },
        {
          title: 'calendar',
          path: PATH_DASHBOARD.calendar,
          icon: ICONS.calendar,
        },
        {
          title: 'tasks',
          path: PATH_DASHBOARD.kanban,
          icon: ICONS.kanban,
        },
      ],
    },

  // APP // ----------------------------------------------------------------------
//   { 
//     subheader: 'Website',
//   items: [

//     candidate
//     {
//       title: 'Website Backend',
//       path: PATH_DASHBOARD.candidate.root,
//       icon: ICONS.website,
//       children: [
//         { title: 'Home',
//         path: PATH_DASHBOARD.mail.root,
//         },
//         { title: 'About',
//         path: PATH_DASHBOARD.chat.root,
//          },
//         { title: 'Services',
//         path: PATH_DASHBOARD.calendar,
//          },
//         { title: 'Contact',
//         path: PATH_DASHBOARD.kanban,
//          },
       
//       ],
//     },
//   ]
// }
];

export default navConfig;
