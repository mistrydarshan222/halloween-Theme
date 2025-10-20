<?php
/**
 * My Block Theme functions
 */

// Theme setup
function my_block_theme_setup() {
    // Add support for block styles
    add_theme_support( 'wp-block-styles' );
    
    // Add support for editor styles
    add_theme_support( 'editor-styles' );
    
    // Add support for responsive embeds
    add_theme_support( 'responsive-embeds' );
    
    // Add support for custom line height
    add_theme_support( 'custom-line-height' );
    
    // Add support for experimental link color
    add_theme_support( 'experimental-link-color' );
}
add_action( 'after_setup_theme', 'my_block_theme_setup' );

// Register custom blocks
function my_block_theme_register_blocks() {
    // Register the halloween-clock block
    register_block_type( get_template_directory() . '/blocks/halloween-clock/build/halloween-clock' );
}
add_action( 'init', 'my_block_theme_register_blocks' );

/**
 * Enqueue theme styles and scripts
 */
function my_block_theme_enqueue_assets() {
    // Enqueue main SCSS compiled stylesheet
    wp_enqueue_style(
        'my-block-theme-main-styles',
        get_template_directory_uri() . '/assets/styles/main.css',
        array(),
        wp_get_theme()->get( 'Version' )
    );
    
    // Enqueue front page styles on front page only
    if ( is_front_page() ) {
        wp_enqueue_style(
            'my-block-theme-front-page-styles',
            get_template_directory_uri() . '/assets/styles/front-page.css',
            array( 'my-block-theme-main-styles' ),
            wp_get_theme()->get( 'Version' )
        );
    }
    
    // Enqueue custom scripts for animations
    wp_enqueue_script(
        'my-block-theme-animations',
        get_template_directory_uri() . '/assets/js/animations.js',
        array(),
        wp_get_theme()->get( 'Version' ),
        true
    );
    
    // Enqueue front page animations on front page only
    if ( is_front_page() ) {
        wp_enqueue_script(
            'my-block-theme-front-page-animations',
            get_template_directory_uri() . '/assets/js/front-page-animations.js',
            array(),
            wp_get_theme()->get( 'Version' ),
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'my_block_theme_enqueue_assets' );

/**
 * Custom PHP Function: Inject current date into template
 * This filter modifies the rendered block content to display the current date
 */
function my_block_theme_inject_current_date( $block_content, $block ) {
    // Only target paragraph blocks with the 'current-date-display' class
    if ( 'core/paragraph' === $block['blockName'] ) {
        if ( isset( $block['attrs']['className'] ) && 
             false !== strpos( $block['attrs']['className'], 'current-date-display' ) ) {
            
            // Get current date in various formats
            $current_date = current_time( 'F j, Y' ); // e.g., "October 19, 2025"
            $current_time = current_time( 'g:i A' );   // e.g., "3:45 PM"
            $day_of_week = current_time( 'l' );         // e.g., "Sunday"
            
            // Create formatted date string with icon
            $date_html = sprintf(
                '<span class="date-icon">📅</span> Today is <strong>%s, %s</strong> at <strong>%s</strong>',
                esc_html( $day_of_week ),
                esc_html( $current_date ),
                esc_html( $current_time )
            );
            
            // Replace the block content with our custom date
            $block_content = preg_replace(
                '/(<p[^>]*class="[^"]*current-date-display[^"]*"[^>]*>)(.*?)(<\/p>)/s',
                '$1' . $date_html . '$3',
                $block_content
            );
        }
    }
    
    return $block_content;
}
add_filter( 'render_block', 'my_block_theme_inject_current_date', 10, 2 );

/**
 * Custom PHP Function: Modify excerpt length
 * Changes the default excerpt length from 55 to 25 words
 */
function my_block_theme_custom_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'my_block_theme_custom_excerpt_length', 999 );

/**
 * Custom PHP Function: Add custom excerpt "Read More" text
 */
function my_block_theme_excerpt_more( $more ) {
    if ( ! is_admin() ) {
        global $post;
        return sprintf(
            ' <a class="read-more-link" href="%s">%s &rarr;</a>',
            esc_url( get_permalink( $post->ID ) ),
            __( 'Continue Reading', 'my-block-theme' )
        );
    }
    return $more;
}
add_filter( 'excerpt_more', 'my_block_theme_excerpt_more' );

/**
 * Custom PHP Function: Add custom body classes based on conditions
 * Enhances styling capabilities by adding contextual classes
 */
function my_block_theme_custom_body_classes( $classes ) {
    // Add class if user is logged in
    if ( is_user_logged_in() ) {
        $classes[] = 'user-logged-in';
    }
    
    // Add class for specific page templates
    if ( is_page_template( 'front-page.html' ) ) {
        $classes[] = 'has-custom-front-page';
    }
    
    // Add class based on time of day
    $hour = (int) current_time( 'G' );
    if ( $hour >= 6 && $hour < 12 ) {
        $classes[] = 'time-morning';
    } elseif ( $hour >= 12 && $hour < 18 ) {
        $classes[] = 'time-afternoon';
    } elseif ( $hour >= 18 && $hour < 22 ) {
        $classes[] = 'time-evening';
    } else {
        $classes[] = 'time-night';
    }
    
    return $classes;
}
add_filter( 'body_class', 'my_block_theme_custom_body_classes' );

/**
 * Custom PHP Function: Register custom REST API endpoint
 * Provides a custom API endpoint for theme data
 */
function my_block_theme_register_rest_route() {
    register_rest_route( 'my-block-theme/v1', '/theme-info', array(
        'methods'  => 'GET',
        'callback' => 'my_block_theme_get_theme_info',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'my_block_theme_register_rest_route' );

/**
 * Callback for custom REST API endpoint
 */
function my_block_theme_get_theme_info() {
    $theme = wp_get_theme();
    
    return array(
        'name'        => $theme->get( 'Name' ),
        'version'     => $theme->get( 'Version' ),
        'author'      => $theme->get( 'Author' ),
        'description' => $theme->get( 'Description' ),
        'current_date' => current_time( 'F j, Y g:i A' ),
        'posts_count' => wp_count_posts( 'post' )->publish,
        'pages_count' => wp_count_posts( 'page' )->publish,
    );
}

/**
 * Custom PHP Function: Add custom image sizes
 */
function my_block_theme_custom_image_sizes() {
    add_image_size( 'testimonial-avatar', 120, 120, true );
    add_image_size( 'featured-large', 1200, 675, true );
    add_image_size( 'featured-medium', 800, 450, true );
}
add_action( 'after_setup_theme', 'my_block_theme_custom_image_sizes' );

/**
 * Custom PHP Function: Modify query to exclude specific categories from homepage
 */
function my_block_theme_modify_main_query( $query ) {
    // Only modify the main query on the front end
    if ( ! is_admin() && $query->is_main_query() && $query->is_home() ) {
        // Example: Exclude category with ID 5 from homepage
        // $query->set( 'cat', '-5' );
        
        // Example: Show only 6 posts per page on homepage
        $query->set( 'posts_per_page', 6 );
    }
}
add_action( 'pre_get_posts', 'my_block_theme_modify_main_query' );

/**
 * Custom PHP Function: Add schema.org markup for better SEO
 */
function my_block_theme_add_schema_markup() {
    if ( is_singular( 'post' ) ) {
        global $post;
        $schema = array(
            '@context' => 'https://schema.org',
            '@type'    => 'BlogPosting',
            'headline' => get_the_title(),
            'datePublished' => get_the_date( 'c' ),
            'dateModified'  => get_the_modified_date( 'c' ),
            'author' => array(
                '@type' => 'Person',
                'name'  => get_the_author(),
            ),
        );
        
        echo '<script type="application/ld+json">' . wp_json_encode( $schema ) . '</script>';
    }
}
add_action( 'wp_head', 'my_block_theme_add_schema_markup' );

/**
 * Custom PHP Function: Performance optimization - remove unnecessary WordPress features
 */
function my_block_theme_performance_optimizations() {
    // Remove emoji scripts and styles
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    
    // Remove WordPress version from head
    remove_action( 'wp_head', 'wp_generator' );
    
    // Remove RSD link
    remove_action( 'wp_head', 'rsd_link' );
    
    // Remove wlwmanifest link
    remove_action( 'wp_head', 'wlwmanifest_link' );
}
add_action( 'init', 'my_block_theme_performance_optimizations' );

/**
 * Custom PHP Function: Custom Login Logo
 * Replaces the default WordPress logo on the login page with a custom theme logo
 */
function custom_login_logo() {
    $logo_url = get_stylesheet_directory_uri() . '/images/logo.png?v=' . time();
    echo '<style type="text/css">
        .login h1 a {
            background-image: url(' . $logo_url . ') !important;
            width: 300px !important;
            height: 100px !important;
            background-size: contain !important;
            background-repeat: no-repeat !important;
            background-position: center !important;
        }
    </style>';
}
add_action( 'login_enqueue_scripts', 'custom_login_logo' );

/**
 * Custom PHP Function: Change login logo URL
 * Makes the login logo link to your site instead of WordPress.org
 */
function custom_login_logo_url() {
    return home_url();
}
add_filter( 'login_headerurl', 'custom_login_logo_url' );

/**
 * Custom PHP Function: Change login logo title
 * Changes the title attribute of the login logo
 */
function custom_login_logo_url_title() {
    return get_bloginfo( 'name' );
}
add_filter( 'login_headertext', 'custom_login_logo_url_title' );
