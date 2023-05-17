import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import Logo3 from './../../assets/illustrations/logo2.png'
import Image from 'next/image';
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 200,
        height: 30,
        display: 'inline-flex',
        
        ...sx,
      }}
      {...other}
    >
      {/* <svg
        id="Group_1"
        data-name="Group 1"
        xmlns="http://www.w3.org/2000/svg"
        width={90}
        viewBox="0 0 50.517 50.696"
      >
        <path
          id="Path_12735"
          data-name="Path 12735"
          d="M230.707,94.605h0a2.974,2.974,0,0,0,.052-4.205l-7.886-8.082a2.974,2.974,0,0,0-4.257,4.154l7.886,8.082a2.974,2.974,0,0,0,4.205.052"
          transform="translate(-211.24 -74.96)"
          fill="#4612c6"
        />
        <path
          id="Path_12736"
          data-name="Path 12736"
          d="M512.8,95.593h0a2.974,2.974,0,0,0,4.205.052l8.082-7.886a2.974,2.974,0,1,0-4.154-4.257l-8.082,7.886a2.974,2.974,0,0,0-.052,4.205"
          transform="translate(-482.08 -76.098)"
          fill="#4612c6"
        />
        <path
          id="Path_12737"
          data-name="Path 12737"
          d="M418.141,17.242h0a2.974,2.974,0,0,0,2.974-2.974V2.977a2.974,2.974,0,1,0-5.947,0V14.269a2.974,2.974,0,0,0,2.974,2.974"
          transform="translate(-392.972 -0.003)"
          fill="#4612c6"
        />
        <path
          id="Path_12738"
          data-name="Path 12738"
          d="M554.822,284.922h0A2.974,2.974,0,0,0,557.8,287.9h11.292a2.974,2.974,0,1,0,0-5.947H557.8a2.974,2.974,0,0,0-2.974,2.974"
          transform="translate(-521.544 -259.574)"
          fill="#4612c6"
        />
        <path
          id="Path_12739"
          data-name="Path 12739"
          d="M515.326,381.478h0a2.974,2.974,0,0,0-.052,4.205l7.886,8.082a2.974,2.974,0,1,0,4.257-4.154l-7.886-8.082a2.974,2.974,0,0,0-4.205-.052"
          transform="translate(-484.356 -350.426)"
          fill="#4612c6"
        />
        <path
          id="Path_12740"
          data-name="Path 12740"
          d="M163.715,284.867a2.965,2.965,0,0,0-2.968-2.919H138.454a2.974,2.974,0,1,0,0,5.947h15.433l-10.98,10.713a2.974,2.974,0,1,0,4.154,4.257l10.713-10.453V307.3a2.974,2.974,0,0,0,5.947,0V284.922h0c0-.019-.005-.036-.005-.055"
          transform="translate(-135.48 -259.574)"
          fill="#ffb000"
        />
      </svg> */}

<Image src={Logo3} width={25} style={{marginLeft: "30px"}} />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={NextLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
