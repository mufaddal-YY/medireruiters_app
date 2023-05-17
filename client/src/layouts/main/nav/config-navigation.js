// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE } from '../../../routes/paths';
// config
import { PATH_AFTER_LOGIN } from '../../../config-global';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const ICONS = {
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
     
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4 mt-1 mr-1">
      
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  ),
  jobs: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="w-4 h-4 mt-1 mr-1">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
      />
    </svg>
  ),
  services: (
    <svg
      id="Component_icon_ic_Dashboard_Copy"
      data-name="Component/icon/ic_Dashboard Copy"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-4 mt-1 mr-1"
      viewBox="0 0 16 16">
      <path
        id="Shape"
        d="M13.6,16H2.4A2.4,2.4,0,0,1,0,13.6V2.96A1.522,1.522,0,0,1,1.52,1.44H3.6V.8A.8.8,0,1,1,5.2.8V1.44h6.32V.8a.8.8,0,1,1,1.6,0V1.44h1.36A1.522,1.522,0,0,1,16,2.96V13.6A2.4,2.4,0,0,1,13.6,16ZM1.6,5.919V13.6a.8.8,0,0,0,.8.8H13.6a.8.8,0,0,0,.8-.8V5.919Zm0-2.879V4.32H14.4V3.04H13.116a.8.8,0,0,1-1.592,0H5.2a.8.8,0,0,1-1.592,0ZM9.44,11.68H3.68a.8.8,0,0,1,0-1.6H9.44a.8.8,0,0,1,0,1.6ZM6.56,8.8H3.68a.8.8,0,0,1,0-1.6H6.56a.8.8,0,1,1,0,1.6Z"
        transform="translate(0 0)"
        fill="#92929d"
      />
    </svg>
  ),
  blogs: (
    <svg
      id="Component_icon_ic_Dashboard_Copy_3"
      data-name="Component/icon/ic_Dashboard Copy 3"
      xmlns="http://www.w3.org/2000/svg"
      className="w-3 h-4 mt-1 mr-1"
      viewBox="0 0 16 16">
      <path
        id="Shape"
        d="M13.04,16H2.96A2.964,2.964,0,0,1,0,13.04V2.96A2.964,2.964,0,0,1,2.96,0h8.56a.8.8,0,0,1,0,1.6H2.96A1.362,1.362,0,0,0,1.6,2.96V13.04A1.362,1.362,0,0,0,2.96,14.4H13.04a1.361,1.361,0,0,0,1.36-1.36V7.28a.8.8,0,0,1,1.6,0v5.76A2.964,2.964,0,0,1,13.04,16ZM8.262,11.2a.793.793,0,0,1-.58-.249L4.22,7.307A.8.8,0,0,1,4.8,5.956a.79.79,0,0,1,.58.249L8.206,9.179,14.571,1.1a.8.8,0,0,1,1.257.99L8.891,10.9A.8.8,0,0,1,8.262,11.2Z"
        transform="translate(0 0)"
        fill="#92929d"
      />
    </svg>
  ),
  contact: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4 mt-1 mr-1"
      >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
      />
    </svg>
  ),
};


const navConfig = [
  {
    title: 'Home',
    icon: ICONS.home,
    path: '/',
  },
  {
    title: 'Jobs',
    icon: ICONS.job,
    path: PATH_PAGE.components,
  },
  {
    title: 'Services',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
  {
    title: 'Blogs',
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
  {
    title: 'Contacts',
    icon: <Iconify icon="eva:book-open-fill" />,
    path: PATH_DOCS.root,
  },
];

export default navConfig;
