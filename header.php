<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
?><!doctype html>

<!--[if lt IE 7 ]> <html class="ie ie6 ie-lt10 ie-lt9 ie-lt8 ie-lt7 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7 ]>    <html class="ie ie7 ie-lt10 ie-lt9 ie-lt8 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8 ]>    <html class="ie ie8 ie-lt10 ie-lt9 no-js" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9 ]>    <html class="ie ie9 ie-lt10 no-js" <?php language_attributes(); ?>> <![endif]-->

<head id="<?php echo get_site_url(); ?>" data-template-set="html5-reset-wordpress-theme">

	<meta charset="<?php bloginfo('charset'); ?>">
	
	<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
	<!--[if IE ]>
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<![endif]-->

	<?php
		if (is_search())
			echo '<meta name="robots" content="noindex, nofollow" />';
	?>

	<title><?php wp_title( '|', true, 'right' ); ?></title>

	<meta name="title" content="<?php wp_title( '|', true, 'right' ); ?>">

	<!--Google will often use this as its description of your page/site. Make it good.-->
	<meta name="description" content="<?php bloginfo('description'); ?>" />

	<?php
		if (true == of_get_option('meta_author'))
			echo '<meta name="author" content="' . of_get_option("meta_author") . '" />';

		if (true == of_get_option('meta_google'))
			echo '<meta name="google-site-verification" content="' . of_get_option("meta_google") . '" />';
	?>

	<meta name="Copyright" content="Copyright &copy; <?php bloginfo('name'); ?> <?php echo date('Y'); ?>. All Rights Reserved.">

	<?php
		/*
			j.mp/mobileviewport & davidbcalhoun.com/2010/viewport-metatag 
			 - device-width : Occupy full width of the screen in its current orientation
			 - initial-scale = 1.0 retains dimensions instead of zooming out if page height > device height
			 - maximum-scale = 1.0 retains dimensions instead of zooming in if page width < device width
		*/
		if (true == of_get_option('meta_viewport'))
			echo '<meta name="viewport" content="' . of_get_option("meta_viewport") . '" />';
	

		/*
			These are for traditional favicons and Android home screens.
			 - sizes: 1024x1024
			 - transparency is OK
			 - see wikipedia for info on browser support: http://mky.be/favicon/ 
			 - See Google Developer docs for Android options. https://developers.google.com/chrome/mobile/docs/installtohomescreen
		*/
		if (true == of_get_option('head_favicon')) {
			echo '<meta name=”mobile-web-app-capable” content=”yes”>';
			echo '<link rel="shortcut icon" sizes=”1024x1024” href="' . of_get_option("head_favicon") . '" />';
		}


		/*
			The is the icon for iOS Web Clip.
			 - size: 57x57 for older iPhones, 72x72 for iPads, 114x114 for iPhone4 retina display (IMHO, just go ahead and use the biggest one)
			 - To prevent iOS from applying its styles to the icon name it thusly: apple-touch-icon-precomposed.png
			 - Transparency is not recommended (iOS will put a black BG behind the icon) -->';
		*/
		if (true == of_get_option('head_apple_touch_icon'))
			echo '<link rel="apple-touch-icon" href="' . of_get_option("head_apple_touch_icon") . '">';
	?>

	<!-- concatenate and minify for production -->
	<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" />
	
	<!-- Application-specific meta tags -->
	<?php
		// Windows 8
		if (true == of_get_option('meta_app_win_name')) {
			echo '<meta name="application-name" content="' . of_get_option("meta_app_win_name") . '" /> ';
			echo '<meta name="msapplication-TileColor" content="' . of_get_option("meta_app_win_color") . '" /> ';
			echo '<meta name="msapplication-TileImage" content="' . of_get_option("meta_app_win_image") . '" />';
		}

		// Twitter
		if (true == of_get_option('meta_app_twt_card')) {
			echo '<meta name="twitter:card" content="' . of_get_option("meta_app_twt_card") . '" />';
			echo '<meta name="twitter:site" content="' . of_get_option("meta_app_twt_site") . '" />';
			echo '<meta name="twitter:title" content="' . of_get_option("meta_app_twt_title") . '">';
			echo '<meta name="twitter:description" content="' . of_get_option("meta_app_twt_description") . '" />';
			echo '<meta name="twitter:url" content="' . of_get_option("meta_app_twt_url") . '" />';
		}

		// Facebook
		if (true == of_get_option('meta_app_fb_title')) {
			echo '<meta property="og:title" content="' . of_get_option("meta_app_fb_title") . '" />';
			echo '<meta property="og:description" content="' . of_get_option("meta_app_fb_description") . '" />';
			echo '<meta property="og:url" content="' . of_get_option("meta_app_fb_url") . '" />';
			echo '<meta property="og:image" content="' . of_get_option("meta_app_fb_image") . '" />';
		}
	?>

	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<?php wp_head(); ?>
	<!--script src="<?php echo get_template_directory_uri(); ?>/js/app/lib/pace/pace.js"></script-->
	<link href="<?php echo get_template_directory_uri(); ?>/js/app/lib/pace/pace-theme-big-counter.css" rel="stylesheet" />
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCEAexlU6R7cWMKaxHF7maBdvVivPMQSgs&sensor=false"></script>
	<script data-main="<?php echo get_template_directory_uri(); ?>/js/app/main" src="<?php echo get_template_directory_uri(); ?>/js/require.js"></script>
	<!--script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/require.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/min.js"></script-->
	
</head>

<body <?php body_class();  ?> >
	
	<div id="wrapper" class="full-page-layout">

		<div id="top-header" class="standard-page-layout">

			<header id="header" role="banner" class="lf">
				<h1><a class="darkgrey" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
			</header>
			
			<nav id="main-nav" role="navigation" class="nav rf">
				<?php wp_nav_menu( array('menu' => 'primary') ); ?>
			</nav>
		</div>
		
		<!--div id="sub-nav-contain" class="nav full-page-layout"-->
				<?php 
					if(has_category_thumbnail(7)){
						$cat_img = get_the_category_data(7);
						$cat_thumbnail = $cat_img->url;
					}
				?>
			<!--div class="sub-nav-bg full-page-layout" ><img src="<?php if(has_category_thumbnail(7)) echo $cat_thumbnail; ?>" /></div-->
			<nav id="sub-nav" role="navigation" class="nav full-page-layout">
				
				<div class="full-page-layout">
				<ul class="photography-nav">
					<?php //wp_list_categories( "hide_empty=0&child_of=7&title_li=" ); ?>
					<?php $categories = get_categories( array("hide_empty"=>0,"child_of"=>7) );?>
					<?php foreach( $categories as $category): ?>
						<li class="square-item-array" ><?php echo get_category_first_post($category->cat_ID);  ?>							
							<a title="<?php echo $category->name; ?>" href="<?php echo get_category_link( $category->cat_ID )?>"><?php echo $category->name; ?></a>
						</li>
					<?php endforeach; ?>
				</ul>
				</div>

				<div class="full-page-layout">
				<ul class="video-nav">
					<?php $posts = fetch_page_posts(8)->posts ?>
					<?php if(isset($posts)):?>
						<?php foreach($posts as $post): ?>
							<?php if(has_post_thumbnail( $post->ID )):?>
								<?php $small = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), "medium");?>
								<?php $categories = array_reverse( get_the_category( $post->ID ) );?>
								<?php $categoryPath = ""; foreach($categories as $category): ?>
									<?php $categoryPath .= "/".$category->slug; ?>
								<?php endforeach; ?>
								<li>
									<img data-category="<?php echo $categoryPath; ?>" data-url='<?php echo $post->post_content ?>' src="<?php echo $small[0]; ?>" />
									<span>
										<h3><?php echo $post->post_title ?></h3>
										<div><?php echo $post->post_excerpt ?></div>
										<div class="button">
											<button class="play pure-button">
												Play
												<span class="glyphicon glyphicon-play"></span>
											</button>
											
										</div>
									</span>
								</li>
							<?php endif; ?>
						<?php endforeach; ?>
					<?php endif;?>
				</ul>
				</div>

				<div class="full-page-layout">
				<ul class="expedition-nav">
					
						<?php wp_list_categories( "hide_empty=0&child_of=7&title_li=" ); ?>
					
				</ul>
				</div>

				<div class="full-page-layout">
					<div class="me-nav">
						Hi, everyone! This is Jun(Jim) Su. Welcome to visit my personal website. If you have any question or idea about my work or website. Please feel me to contact me.
					</div>
				</div>
			</nav>
			<div class="full-page-layout fullline"></div>
		<!--/div-->
