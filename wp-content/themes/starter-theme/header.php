<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Starter_Theme
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<!-- Background Container -->
<div class="bg bg--main"></div>

<div id="page" class="site container">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'starter-theme' ); ?></a>

	<header class="header">
		<nav class="nav">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="nav__logo">
				<img src="<?php echo get_template_directory_uri(); ?>/assets/images/logo.svg" alt="Mercadito" class="nav__logo-img">
			</a>
			<button class="nav__toggle">
				<span class="nav__toggle-line"></span>
				<span class="nav__toggle-line"></span>
				<span class="nav__toggle-line"></span>
			</button>
			<ul class="nav__list">
				<li class="nav__item"><a href="#why-us" class="nav__link">Why Us</a></li>
				<li class="nav__item"><a href="#menu" class="nav__link">Menu</a></li>
				<li class="nav__item"><a href="#popular-dishes" class="nav__link">Popular Dishes</a></li>
				<li class="nav__item"><a href="#book" class="nav__link">Book</a></li>
				<li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
			</ul>
		</nav>
	</header>
