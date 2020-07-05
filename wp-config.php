<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** MySQL database username */
define( 'DB_USER', 'wordpress' );

/** MySQL database password */
define( 'DB_PASSWORD', 'c6d47e86fb42bf3f89151fe2e013f5d7b3177d1043c499fc' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '7D+&C$Qh^Fx16>t%?4ZIBdJl~kWij^UFm9iiw.q$aq!=ep^lyn8A xWhHzg+1*w>' );
define( 'SECURE_AUTH_KEY',  '.I4izlQY]a,?SgMEa8k?^T!@[,:D&mz8e9<)vJV/-|>=$;b8wUP$/S*Xv@MzzpLc' );
define( 'LOGGED_IN_KEY',    'ZnW<<&wa=xBEsN* k/2((WgnFyCx%0,+&N<:}Q5?*(##A#^w2bDkb2<4]8 D nh.' );
define( 'NONCE_KEY',        '{[Z8)NygvLa%Lgcr=8V4mn]<XTHpY04H>my+:a.)283M{_BTZkxYq3or!cLv{/K}' );
define( 'AUTH_SALT',        'YOT%.!]vcA>o2o[_t_H#Mf}Kw.M/81V<(EF 3nNpo4jK^C[V%;$b,}=pPeEW`/w7' );
define( 'SECURE_AUTH_SALT', 'kWS@DS,#7V% anGLIU$G0SP|+#k8yqoaC:je.Hm??snfx3 d~hMQU*6|6?dn}9JF' );
define( 'LOGGED_IN_SALT',   ';/y X!)cmMtKo7mlR_hmcnKPYI(hu~[Zyx!Uj4#u%yzofXnsLRA<i00=$rU*WHAV' );
define( 'NONCE_SALT',       'Z2;MloWIqU;p-*oPw?LeWGGn+YgWx.!}R_#cPEV2pgoa-8lxa[)>]AC0yD|}x/2)' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
