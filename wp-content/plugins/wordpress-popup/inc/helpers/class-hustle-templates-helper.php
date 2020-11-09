<?php
/**
 * Hustle_Templates_Helper class.
 *
 * @package Hustle
 * @since 4.3.0
 */

/**
 * Helper class for handling templates.
 *
 * @since 4.3.0
 */
class Hustle_Templates_Helper {

	/**
	 * Path to templates.
	 *
	 * @since 4.3.0
	 * @var string
	 */
	private $templates_path;

	/**
	 * URL to thumbnails.
	 *
	 * @since 4.3.0
	 * @var string
	 */
	private $thumbnails_url;

	/**
	 * URL to templates' images.
	 *
	 * @since 4.3.0
	 * @var string
	 */
	private $images_url;

	/**
	 * Hustle_Templates_Helper class constructor.
	 *
	 * @since 4.3.0
	 */
	public function __construct() {
		$this->thumbnails_url = Opt_In::$plugin_url . 'assets/images/templates-thumbnails/';
		$this->templates_path = Opt_In::$plugin_path . 'inc/templates/';
		$this->images_url     = Opt_In::$plugin_url . 'assets/images/templates-images/';
	}

	/**
	 * Gets the available templates for optins.
	 *
	 * @since 4.3.0
	 * @return array
	 */
	public function get_optin_templates_data() {

		$templates = array(
			'minimalist'   => array(
				'label'            => __( 'Minimalist', 'hustle' ),
				'description'      => __( 'Tailored to promote your seasonal offers in a modern layout.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_minimalist.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_minimalist@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-minimalist.php',
				'feature_image'    => $this->images_url . 'minimalist.jpg',
				'background_image' => '',
			),
			'spring'       => array(
				'label'            => __( 'Spring Sale', 'hustle' ),
				'description'      => __( 'Tailored to promote your seasonal offers in a modern layout.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_spring.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_spring@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-spring.php',
				'feature_image'    => '',
				'background_image' => $this->images_url . 'spring.jpg',
			),
			'stay'         => array(
				'label'            => __( 'Stay - Exit Intent', 'hustle' ),
				'description'      => __( "Capture your visitors' attention when they are about to leave with an exclusive offer.", 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_stay.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_stay@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-stay.php',
				'feature_image'    => $this->images_url . 'stay.png',
				'background_image' => '',
			),
			'foodie'       => array(
				'label'            => __( 'Foodie', 'hustle' ),
				'description'      => __( 'Put your products front and center with a background image and bold typography.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_foodie.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_foodie@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-foodie.php',
				'feature_image'    => '',
				'background_image' => $this->images_url . 'foodie-background.jpg',
			),
			'tech'         => array(
				'label'            => __( 'Tech', 'hustle' ),
				'description'      => __( "A perfect template to showcase your latest app and grab visitors' interest.", 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_tech.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_tech@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-tech.php',
				'feature_image'    => $this->images_url . 'tech-image.png',
				'background_image' => $this->images_url . 'tech-background.png',
			),
			'black_friday' => array(
				'label'            => __( 'Black Friday', 'hustle' ),
				'description'      => __( 'Promote your Black Friday deals in a dark theme.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_black_friday.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_black_friday@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-black-friday.php',
				'feature_image'    => '',
				'background_image' => '',
			),
			'newsletter'   => array(
				'label'            => __( 'Newsletter Signup', 'hustle' ),
				'description'      => __( 'A classic opt-in to increase your newsletter signups.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_newsletter.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_newsletter@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-newsletter.php',
				'feature_image'    => $this->images_url . 'newsletter-image.png',
				'background_image' => '',
			),
			'spin'         => array(
				'label'            => __( 'Spin the Wheel', 'hustle' ),
				'description'      => __( 'Encourage your visitors to signup with the wheel of fortune.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_spin.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_spin@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-spin.php',
				'feature_image'    => $this->images_url . 'spin-image.png',
				'background_image' => '',
			),
			'give_away'    => array(
				'label'            => __( 'Give Away', 'hustle' ),
				'description'      => __( 'A simple yet effective template to announce your giveaways.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_give_away.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_give_away@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-give-away.php',
				'feature_image'    => $this->images_url . 'give-away-image.jpg',
				'background_image' => '',
			),
			'pandemic'     => array(
				'label'            => __( 'Pandemic', 'hustle' ),
				'description'      => __( 'Tailored for quickly setting up Covid-19 alerts/updates for your visitors.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'optin_pandemic.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'optin_pandemic@2x.jpg',
				'template_path'    => $this->templates_path . 'optin-pandemic.php',
				'feature_image'    => $this->images_url . 'pandemic-image.png',
				'background_image' => '',
			),
		);

		return apply_filters( 'hustle_optin_templates_data', $templates );
	}


	/**
	 * Gets the available templates for informationals.
	 *
	 * @since 4.3.0
	 * @return array
	 */
	public function get_informational_templates_data() {

		$templates = array(
			'minimalist'   => array(
				'label'            => __( 'Minimalist', 'hustle' ),
				'description'      => __( 'Tailored to promote your seasonal offers in a modern layout.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_minimalist.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_minimalist@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-minimalist.php',
				'feature_image'    => $this->images_url . 'minimalist.jpg',
				'background_image' => '',
			),
			'spring'       => array(
				'label'            => __( 'Spring Sale', 'hustle' ),
				'description'      => __( 'Tailored to promote your seasonal offers in a modern layout.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_spring.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_spring@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-spring.php',
				'feature_image'    => '',
				'background_image' => $this->images_url . 'spring.jpg',
			),
			'foodie'       => array(
				'label'            => __( 'Foodie', 'hustle' ),
				'description'      => __( 'Put your products front and center with a background image and bold typography.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_foodie.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_foodie@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-foodie.php',
				'feature_image'    => '',
				'background_image' => $this->images_url . 'foodie-background.jpg',
			),
			'tech'         => array(
				'label'            => __( 'Tech', 'hustle' ),
				'description'      => __( "A perfect template to showcase your latest app and grab visitors' interest.", 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_tech.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_tech@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-tech.php',
				'feature_image'    => $this->images_url . 'tech-image.png',
				'background_image' => $this->images_url . 'tech-background.png',
			),
			'black_friday' => array(
				'label'            => __( 'Black Friday', 'hustle' ),
				'description'      => __( 'Promote your Black Friday deals in a dark theme.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_black_friday.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_black_friday@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-black-friday.php',
				'feature_image'    => '',
				'background_image' => '',
			),
			'adblock'      => array(
				'label'            => __( 'Ad-Block', 'hustle' ),
				'description'      => __( "Don't let them access your content if they have an ad-blocking extension on.", 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_adblock.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_adblock@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-adblock.php',
				'feature_image'    => $this->images_url . 'adblock-image.png',
				'background_image' => '',
			),
			'give_away'    => array(
				'label'            => __( 'Give Away', 'hustle' ),
				'description'      => __( 'A simple yet effective template to announce your giveaways.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_give_away.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_give_away@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-give-away.php',
				'feature_image'    => $this->images_url . 'give-away-image.jpg',
				'background_image' => '',
			),
			'pandemic'     => array(
				'label'            => __( 'Pandemic', 'hustle' ),
				'description'      => __( 'Tailored for quickly setting up Covid-19 alerts/updates for your visitors.', 'hustle' ),
				'thumbnail'        => $this->thumbnails_url . 'informational_pandemic.jpg',
				'thumbnail2x'      => $this->thumbnails_url . 'informational_pandemic@2x.jpg',
				'template_path'    => $this->templates_path . 'informational-pandemic.php',
				'feature_image'    => $this->images_url . 'pandemic-image.png',
				'background_image' => '',
			),
		);

		return apply_filters( 'hustle_informational_templates_data', $templates );
	}

	/**
	 * Gets the template to import.
	 *
	 * @since 4.3.0
	 *
	 * @param string $template_slug Template slug.
	 * @param string $mode Module mode, optin|informational.
	 * @return array
	 */
	public function get_template( $template_slug, $mode ) {
		if ( 'none' === $template_slug ) {
			return array();
		}

		$templates = $this->get_templates_for_mode( $mode );

		// The passed template isn't valid.
		if ( empty( $templates[ $template_slug ] ) ) {
			return array();
		}

		$template_data = $templates[ $template_slug ];

		if ( file_exists( $template_data['template_path'] ) ) {
			$template_to_import = include $template_data['template_path'];

			if ( $template_to_import ) {
				$template_to_import['content']['feature_image']    = $template_data['feature_image'];
				$template_to_import['content']['background_image'] = $template_data['background_image'];

				return $template_to_import;
			}
		}

		return array();
	}

	/**
	 * Gets the set of templates data for the passed module mode.
	 *
	 * @since 4.3.0
	 *
	 * @param string $mode informational|optin.
	 * @return array
	 */
	private function get_templates_for_mode( $mode ) {
		if ( Hustle_Module_Model::OPTIN_MODE === $mode ) {
			return $this->get_optin_templates_data();
		}
		return $this->get_informational_templates_data();
	}
}
