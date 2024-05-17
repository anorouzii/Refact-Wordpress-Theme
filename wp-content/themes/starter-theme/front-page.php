<?php
/*
Template Name: Home Page
*/

get_header(); ?>

	<main>
		<?php get_template_part( 'template-parts/hero' ); ?>
		<?php get_template_part( 'template-parts/why-us' ); ?>
		<?php get_template_part( 'template-parts/menu' ); ?>
		<?php get_template_part( 'template-parts/popular-dishes' ); ?>
	</main>

<?php get_footer(); ?>
