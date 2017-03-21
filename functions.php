<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */

	// Options Framework (https://github.com/devinsays/options-framework-plugin)
	if ( !function_exists( 'optionsframework_init' ) ) {
		define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/_/inc/' );
		require_once dirname( __FILE__ ) . '/_/inc/options-framework.php';
	}

	// Theme Setup (based on twentythirteen: http://make.wordpress.org/core/tag/twentythirteen/)
	function html5reset_setup() {
		load_theme_textdomain( 'html5reset', get_template_directory() . '/languages' );
		add_theme_support( 'automatic-feed-links' );	
		add_theme_support( 'structured-post-formats', array( 'link', 'video' ) );
		add_theme_support( 'post-formats', array( 'aside', 'audio', 'chat', 'gallery', 'image', 'quote', 'status' ) );
		register_nav_menu( 'primary', __( 'Navigation Menu', 'html5reset' ) );
		add_theme_support( 'post-thumbnails' );
	}
	add_action( 'after_setup_theme', 'html5reset_setup' );
	
	// Scripts & Styles (based on twentythirteen: http://make.wordpress.org/core/tag/twentythirteen/)
	function html5reset_scripts_styles() {
		global $wp_styles;

		// Load Comments	
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) )
			wp_enqueue_script( 'comment-reply' );
	
		// Load Stylesheets
//		wp_enqueue_style( 'html5reset-reset', get_template_directory_uri() . '/reset.css' );
//		wp_enqueue_style( 'html5reset-style', get_stylesheet_uri() );
	
		// Load IE Stylesheet.
//		wp_enqueue_style( 'html5reset-ie', get_template_directory_uri() . '/css/ie.css', array( 'html5reset-style' ), '20130213' );
//		$wp_styles->add_data( 'html5reset-ie', 'conditional', 'lt IE 9' );

		// Modernizr
		// This is an un-minified, complete version of Modernizr. Before you move to production, you should generate a custom build that only has the detects you need.
		// wp_enqueue_script( 'html5reset-modernizr', get_template_directory_uri() . '/_/js/modernizr-2.6.2.dev.js' );
		
	}
	add_action( 'wp_enqueue_scripts', 'html5reset_scripts_styles' );
	
	// WP Title (based on twentythirteen: http://make.wordpress.org/core/tag/twentythirteen/)
	function html5reset_wp_title( $title, $sep ) {
		global $paged, $page;
	
		if ( is_feed() )
			return $title;
	
//		 Add the site name.
		$title .= get_bloginfo( 'name' );
	
//		 Add the site description for the home/front page.
		$site_description = get_bloginfo( 'description', 'display' );
		if ( $site_description && ( is_home() || is_front_page() ) )
			$title = "$title $sep $site_description";
	
//		 Add a page number if necessary.
		if ( $paged >= 2 || $page >= 2 )
			$title = "$title $sep " . sprintf( __( 'Page %s', 'html5reset' ), max( $paged, $page ) );
//FIX
//		if (function_exists('is_tag') && is_tag()) {
//		   single_tag_title("Tag Archive for &quot;"); echo '&quot; - '; }
//		elseif (is_archive()) {
//		   wp_title(''); echo ' Archive - '; }
//		elseif (is_search()) {
//		   echo 'Search for &quot;'.wp_specialchars($s).'&quot; - '; }
//		elseif (!(is_404()) && (is_single()) || (is_page())) {
//		   wp_title(''); echo ' - '; }
//		elseif (is_404()) {
//		   echo 'Not Found - '; }
//		if (is_home()) {
//		   bloginfo('name'); echo ' - '; bloginfo('description'); }
//		else {
//		    bloginfo('name'); }
//		if ($paged>1) {
//		   echo ' - page '. $paged; }
	
		return $title;
	}
	add_filter( 'wp_title', 'html5reset_wp_title', 10, 2 );




//OLD STUFF BELOW


	// Load jQuery
	if ( !function_exists( 'core_mods' ) ) {
		function core_mods() {
			if ( !is_admin() ) {
				wp_deregister_script( 'jquery' );
				//wp_register_script( 'jquery', ( "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ), false);
				//wp_enqueue_script( 'jquery' );
			}
		}
		add_action( 'wp_enqueue_scripts', 'core_mods' );
	}

	// Clean up the <head>, if you so desire.
	//	function removeHeadLinks() {
	//    	remove_action('wp_head', 'rsd_link');
	//    	remove_action('wp_head', 'wlwmanifest_link');
	//    }
	//    add_action('init', 'removeHeadLinks');

	// Custom Menu
	register_nav_menu( 'primary', __( 'Navigation Menu', 'html5reset' ) );

	// Widgets
	if ( function_exists('register_sidebar' )) {
		function html5reset_widgets_init() {
			register_sidebar( array(
				'name'          => __( 'Sidebar Widgets', 'html5reset' ),
				'id'            => 'sidebar-primary',
				'before_widget' => '<div id="%1$s" class="widget %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<h3 class="widget-title">',
				'after_title'   => '</h3>',
			) );
		}
		add_action( 'widgets_init', 'html5reset_widgets_init' );
	}

	// Navigation - update coming from twentythirteen
	function post_navigation() {
		echo '<div class="navigation">';
		echo '	<div class="next-posts">'.get_next_posts_link('&laquo; Older Entries').'</div>';
		echo '	<div class="prev-posts">'.get_previous_posts_link('Newer Entries &raquo;').'</div>';
		echo '</div>';
	}

	// Posted On
	function posted_on() {
		printf( __( '<span class="sep">Posted </span><a href="%1$s" title="%2$s" rel="bookmark"><time class="entry-date" datetime="%3$s" pubdate>%4$s</time></a> by <span class="byline author vcard">%5$s</span>', '' ),
			esc_url( get_permalink() ),
			esc_attr( get_the_time() ),
			esc_attr( get_the_date( 'c' ) ),
			esc_html( get_the_date() ),
			esc_attr( get_the_author() )
		);
	}

	
	//load scripts
	function enqueue_scripts(){
		if(!is_admin){
			//wp_de
		}
	}
	
	//fetch page posts
	function fetch_page_posts( $catId, $num = "-1" ){
		return new WP_Query(array(
			'post_status' => 'publish',
			'has_password' => false,
			'orderby' => 'date',
			'order' => 'DESC',
			'posts_per_page' => $num,
			'cat' => $catId
		));
	}

	function get_post_data(){
		define("PHCATEGORYID", 7);
		$post_array = fetch_page_posts( 9 )->posts;
		/*
		[
			{
				mid : post_id,
				excerpt : expcerpt,
				imgSrc : "http://www.google.com",
    			place : "textCity" ,
    			position : "65.219894,-151.201175", 
    			icon : "http://maps.google.com/mapfiles/markerA.png", 
    			category : "alaska", 
    			order : "1", 
    			link : "http://www.google.com", 
    			date : "2014-01-01",
	   	        template : "mapInfoHtml"
			},
			{
				mid : post_id,
				excerpt : expcerpt,
				imgSrc : "http://www.google.com",
    			place : "textCity" ,
    			position : "65.219894,-151.201175", 
    			icon : "http://maps.google.com/mapfiles/markerA.png", 
    			category : "alaska", 
    			order : "1", 
    			link : "http://www.google.com", 
    			date : "2014-01-01",
	   	       template : "mapInfoHtml"
			},
			{},
			{}
		]
		*/
		$post_json = array();
		$i = 0;
		foreach($post_array as $post_item){

			$categories = get_the_category($post_item->ID);
			foreach( $categories as $category){
				if( $category->category_parent == PHCATEGORYID ){
					$post_json[$i]["category"] = $category->name;
					$post_json[$i]["slug"] = $category->slug;
				}
			}
			
			$post_json[$i]["mid"] = $post_item->ID;
			$post_json[$i]["title"] = $post_item->post_title;
			$post_json[$i]["excerpt"] = $post_item->post_excerpt;
			$post_json[$i]["imgSrc"] = get_the_post_thumbnail( $post_item->ID, array(320,240) );
			$post_json[$i]["place"] = $post_item->place;
			$post_json[$i]["position"] = $post_item->position;
			$post_json[$i]["icon"] = $post_item->icon;
			$post_json[$i]["order"] = $post_item->ID;
			$post_json[$i]["link"] = "";
			$post_json[$i]["date"] = $post_item->post_date;
			$post_json[$i]["template"] = "mapInfoHtml";
			$i++;
		
		}
		return json_encode($post_json);
	}
	
	function get_category_first_post($catId){
		$first_post = fetch_page_posts($catId, 1)->posts;
		if(has_post_thumbnail($first_post[0]->ID) && !!count($first_post)){
			return get_the_post_thumbnail( $first_post[0]->ID, array(140, 140) );
		}else{
			return "<img src='".get_template_directory_uri()."/images/default/defaultCat.jpg' />";
		}

	}

	//add customize in the posts
	function new_geo_info(){
		add_meta_box( 
			'geo_info_section',
			'geo_info',
			'geo_custom_box',
			'post'
		);
	}
	//generate geo template
	function geo_custom_box( $post ){
		global $wpdb;
		wp_nonce_field( plugin_basename(__FILE__),'geo_info_noncename');
		$data = $wpdb->get_row( $wpdb->prepare("SELECT place, position, icon FROM $wpdb->posts WHERE ID=%d", $post->ID) );
		echo '<label for="place_field">Place</label>';
		echo '<input type="text" id="place_field" name="place_field" value="'.$data->place.'" />';
		echo '<label for="position_field">Position</label>';
		echo '<input type="text" id="position_field" name="position_field" value="'.$data->position.'" />';
		echo '<label for="icon_field">Icon</label>';
		echo '<input type="text" id="icon_field" name="icon_field" value="'.$data->icon.'" />';
	}
	//save geo info
	function save_geo_info( $post_id){
		if( defined( 'DOING_AUTOSAVE' && DOING_AUTOSAVE ) ){
			return;
		}
		
		if( !wp_verify_nonce( $_POST['geo_info_noncename'], plugin_basename( __FILE__ ) ) ){
			return;
		}
		
		if( 'post' == $_POST['post_type'] ){
			if( !current_user_can( 'edit_post', $post_id ) ){
				return;
			}
		}
		
		$place = $_POST['place_field'];
		$position = $_POST['position_field'];
		$icon = $_POST['icon_field'];
		
		global $wpdb;
		$wpdb->update( 
				"$wpdb->posts",
				array( 'place' => $place , 'position' => $position, 'icon' => $icon ),
				array( 'ID' => $post_id ),
				array( '%s','%s','%s' ),
				array( '%d' ) 
		);
	}
	add_action("add_meta_boxes","new_geo_info");
	add_action("save_post", "save_geo_info");
	
	function music_info(){
		add_meta_box(
			'music_info_section',
			'music_id',
			'music_custom_box',
			'post'
		);
	}

	function music_custom_box( $post ){
		global $wpdb;
		wp_nonce_field( plugin_basename(__FILE__),'music_info_noncename');
		$data = $wpdb->get_row( $wpdb->prepare("SELECT music_id FROM $wpdb->posts WHERE ID=%d", $post->ID) );
		echo '<label for="music_id">music id</label>';
		echo '<input type="text" id="music_id_field" name="music_id_field" value="'.$data->music_id.'" />';
	}
	
	function save_music_info( $post_id ){
		if( defined( 'DOING_AUTOSAVE' && DOING_AUTOSAVE ) ){
			return;
		}
		
		if( !wp_verify_nonce( $_POST['music_info_noncename'], plugin_basename( __FILE__ ) ) ){
			return;
		}
		
		if( 'post' == $_POST['post_type'] ){
			if( !current_user_can( 'edit_post', $post_id ) ){
				return;
			}
		}
		
		$music_id = $_POST['music_id_field'];
		
		global $wpdb;
		$wpdb->update( 
				"$wpdb->posts",
				array( 'music_id' => $music_id),
				array( 'ID' => $post_id ),
				array( '%s' ),
				array( '%d' ) 
		);
	}
	add_action("add_meta_boxes","music_info");
	add_action("save_post","save_music_info");

	//Enable ajax handler
	function ajax_posts(){
		wp_localize_script( 'main', 'main', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );
	}
	//getPostDataByAjax
	function get_ajax_post_data(){
		
		$data = "aaa";
		echo json_encode($data);
		die();
	}
	//sendmail
	function send_mail(){
		$address = $_POST["address"];
		$content = $_POST["content"];
		$conHtml = "From ".$address." :<br/>".$content;
		mail( get_bloginfo('admin_email'), "contact me", $conHtml );
		echo "Thank you."; 
		exit();
	}

	function get_subcategories($cat_id){
		
		$args = array(
			'parent'	=>	$cat_id,
			'orderby'	=>	'id',
			'order'		=>	'DESC',
			'hide_empty'=>	'0'
		);
		return get_categories( $args );
	}

	function get_post_category_asclass($post_id){
		$category_string = "";
		$categories = get_the_category( $post_id );
		foreach( $categories as $category ){
			$category_string .= $category->cat_ID.",";
		}
		return $category_string;
	}

	function load_content(){
		$post = get_post($_POST["id"]);
		echo (json_encode($post));
		die();
	}

	add_action("wp_ajax_get_ajax_post_data", "get_ajax_post_data");
	add_action("wp_ajax_nopriv_send_mail","send_mail");
	add_action("wp_ajax_send_mail","send_mail");
	add_action("wp_ajax_load_content","load_content");
	add_action("wp_ajax_nopriv_load_content", "load_content");

	add_theme_support('category-thumbnails');
?>
