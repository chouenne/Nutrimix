import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

function Header() {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="inherit"
				elevation={0}
				sx={{ borderBottom: '1px solid #ddd' }}
			>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						BlogmeUp
					</Typography>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;


