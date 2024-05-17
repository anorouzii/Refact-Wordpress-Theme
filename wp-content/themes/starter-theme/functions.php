<?php
/**
 * Starter Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Starter_Theme
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'starter_theme_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function starter_theme_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Starter Theme, use a find and replace
		 * to change 'starter-theme' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'starter-theme', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'starter-theme' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'starter_theme_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'starter_theme_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function starter_theme_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'starter_theme_content_width', 640 );
}
add_action( 'after_setup_theme', 'starter_theme_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function starter_theme_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'starter-theme' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'starter-theme' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'starter_theme_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function starter_theme_scripts() {
	wp_enqueue_style('theme-vendor-style', get_template_directory_uri() . '/assets/styles/vendor.min.css', array(), rand(111, 9999), 'all');
		wp_enqueue_style('theme-style', get_template_directory_uri() . '/assets/styles/style.min.css', array(), rand(111, 9999), 'all');
		wp_enqueue_script('theme-vendor', get_template_directory_uri() . '/assets/scripts/vendor.min.js', array('jquery'), rand(111, 9999), true);
		wp_enqueue_script('theme-js', get_template_directory_uri() . '/assets/scripts/main.min.js', array('jquery'), rand(111, 9999), true);
}
add_action( 'wp_enqueue_scripts', 'starter_theme_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}


/**
 * Show Message to install ACF in Admin.
 */

function check_acf_plugin() {
	if (!class_exists('ACF')) {
		add_action('admin_notices', 'acf_plugin_notice');
	}
}
add_action('admin_init', 'check_acf_plugin');

function acf_plugin_notice() {
	?>
	<div class="notice notice-warning is-dismissible">
		<p><?php _e('This theme requires the Advanced Custom Fields (ACF) plugin. Please install and activate it.', 'your-text-domain'); ?></p>
	</div>
	<?php
}

/**
 * Define ACF fields.
 */

if( function_exists('acf_add_local_field_group') ) {

	// Menu Categories
	acf_add_local_field_group(array(
		'key' => 'group_menu_items',
		'title' => 'Menu Items',
		'fields' => array(
			array(
				'key' => 'field_menu_category',
				'label' => 'Category',
				'name' => 'category',
				'type' => 'select',
				'choices' => array(
					'starter' => 'Starter',
					'main_dishes' => 'Main Dishes',
					'desserts' => 'Desserts',
				),
			),
			array(
				'key' => 'field_menu_item_name',
				'label' => 'Name',
				'name' => 'name',
				'type' => 'text',
			),
			array(
				'key' => 'field_menu_item_recipe',
				'label' => 'Recipe',
				'name' => 'recipe',
				'type' => 'textarea',
			),
			array(
				'key' => 'field_menu_item_price',
				'label' => 'Price',
				'name' => 'price',
				'type' => 'number',
				'prepend' => '$',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'menu_item',
				),
			),
		),
	));

	// Popular Dishes
	acf_add_local_field_group(array(
		'key' => 'group_popular_dishes',
		'title' => 'Popular Dishes',
		'fields' => array(
			array(
				'key' => 'field_popular_dish_image',
				'label' => 'Image',
				'name' => 'image',
				'type' => 'image',
				'return_format' => 'url',
			),
			array(
				'key' => 'field_popular_dish_price',
				'label' => 'Price',
				'name' => 'price',
				'type' => 'number',
				'prepend' => '$',
			),
			array(
				'key' => 'field_popular_dish_description',
				'label' => 'Description',
				'name' => 'description',
				'type' => 'textarea',
			),
		),
		'location' => array(
			array(
				array(
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'popular_dish',
				),
			),
		),
	));
}

/**
 * Define Custom post type for Menu and popular dishes.
 */
function create_custom_post_types() {

	// Menu Item Post Type
	register_post_type('menu_item', array(
		'labels' => array(
			'name' => __('Menu Items'),
			'singular_name' => __('Menu Item'),
		),
		'public' => true,
		'has_archive' => true,
		'supports' => array('title', 'editor', 'thumbnail'),
	));

	// Popular Dish Post Type
	register_post_type('popular_dish', array(
		'labels' => array(
			'name' => __('Popular Dishes'),
			'singular_name' => __('Popular Dish'),
		),
		'public' => true,
		'has_archive' => true,
		'supports' => array('title', 'editor', 'thumbnail'),
	));
}
add_action('init', 'create_custom_post_types');
