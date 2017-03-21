<?php
/**
 * @package WordPress
 * @subpackage HTML5-Reset-WordPress-Theme
 * @since HTML5 Reset 2.0
 */
?>

  <!--player start-->
      <!--div class="jplayer-container">
        <div id="jquery_jplayer_1" class="jp-jplayer"></div>
        <div id="jp_container_1" class="jp-audio">
          <div class="jp-type-single">
              <div class="jp-gui jp-interface">
                <ul class="jp-controls">
                  <li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
                  <li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
                </ul>
                <div class="jp-volume-bars">
                    <div class="volume-button"></div>
                    <div class="jp-volume-bar">
                      <div class="jp-volume-bar-value"></div>
                    </div>
                    <div class="volume-amp-button"></div>
                  </div>
                  <div class="jp-time-holder">
                    <div class="jp-current-time"></div>
                    <div class="jp-duration"></div>
                  </div>
                  <div class="jp-playlist-btn"><span class="glyphicon glyphicon-list"></span>Playlist</div>
                  <div class="jp-progress">
                    <div class="jp-seek-bar">
                      <div class="jp-play-bar"></div>
                    </div>
                  </div>
                  
              </div>
              
              <div class="jp-no-solution">
                  <span>Update Required</span>
                  To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
              </div>
          </div>
        </div>
        <div class="playlist">
          <ul>
           <?php echo do_shortcode('[music orderby="id" order="DESC" ]' );?>
          </ul>
        </div>
      </div-->
     <!--player end-->
		
    <footer id="footer" class="source-org vcard copyright full-page-layout" role="contentinfo">

    <!--player start-->
      <div class="jplayer-container">
        <div id="jquery_jplayer_1" class="jp-jplayer"></div>
        <div id="jp_container_1" class="jp-audio">
          <div class="jp-type-single">
              <div class="jp-gui jp-interface">
                <ul class="jp-controls">
                  <li><a href="javascript:;" class="jp-play" tabindex="1">play</a></li>
                  <li><a href="javascript:;" class="jp-pause" tabindex="1">pause</a></li>
                </ul>
                <div class="jp-volume-bars">
                    <div class="volume-button"></div>
                    <div class="jp-volume-bar">
                      <div class="jp-volume-bar-value"></div>
                    </div>
                    <div class="volume-amp-button"></div>
                  </div>
                  <div class="jp-time-holder">
                    <div class="jp-current-time"></div>
                    <div class="jp-duration"></div>
                  </div>
                  <div class="jp-playlist-btn"><span class="glyphicon glyphicon-list"></span>Playlist</div>
                  <div class="jp-progress">
                    <div class="jp-seek-bar">
                      <div class="jp-play-bar"></div>
                    </div>
                  </div>
                  
              </div>
              
              <div class="jp-no-solution">
                  <span>Update Required</span>
                  To play the media you will need to either update your browser to a recent version or update your <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
              </div>
          </div>
        </div>
        <div class="playlist">
          <ul>
           <?php echo do_shortcode('[music orderby="id" order="DESC" ]' );?>
          </ul>
        </div>
      </div>
     <!--player end-->
      
      <small>Designed and Built by Ragnaroksj. &copy;<?php echo date("Y"); echo " "; bloginfo('name'); ?></small>
    </footer>

	</div>

	<?php //wp_footer(); ?>


<!-- here comes the javascript -->

<!-- jQuery is called via the WordPress-friendly way via functions.php -->

<!-- this is where we put our custom functions -->
<!--script src="<?php bloginfo('template_directory'); ?>/_/js/functions.js"></script-->

<!-- Asynchronous google analytics; this is the official snippet.
         Replace UA-XXXXXX-XX with your site's ID and domainname.com with your domain, then uncomment to enable.

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-XXXXXX-XX', 'domainname.com');
  ga('send', 'pageview');

</script>
-->
<div class="pace-bg">
  <div class="pace-bg-img"></div>
  <div class="pace-progress-indicator"></div>
</div>
</body>

</html>
