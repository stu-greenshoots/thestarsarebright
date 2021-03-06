<?php
/**
 * Bsf Custom Fonts update class
 *
 * @since  1.2.5
 * @package Bsf_Custom_Fonts
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Custom_Fonts_Update initial setup
 *
 * @since 1.2.5
 */
class Custom_Fonts_Update {

	/**
	 * Member Variable
	 *
	 * @var instance
	 */
	private static $instance;

	/**
	 * Option key for stored version number.
	 *
	 * @var instance
	 */
	private $db_version_key = '_custom_fonts_db_version';

	/**
	 *  Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor
	 */
	public function __construct() {

		// Plugin updates.
		if ( is_admin() ) {
			add_action( 'admin_init', array( $this, 'init' ), 5 );
		} else {
			add_action( 'wp', array( $this, 'init' ), 5 );
		}
	}

	/**
	 * Implement plugin update logic.
	 *
	 * @since 1.2.5
	 */
	public function init() {
		do_action( 'custom_fonts_update_before' );

		if ( ! $this->needs_db_update() ) {
			return;
		}

		$db_version = get_option( $this->db_version_key, false );

		if ( version_compare( $db_version, '1.2.4', '<=' ) ) {
			$this->v_1_2_5();
		}

		$this->update_db_version();

		do_action( 'custom_fonts_update_after' );
	}

	/**
	 * Removes the http:// from the font display property.
	 *
	 * @since 1.2.5
	 */
	public function v_1_2_5() {

		$terms = get_terms(
			'bsf_custom_fonts',
			array(
				'hide_empty' => false,
			)
		);

		if ( ! empty( $terms ) ) {
			foreach ( $terms as $term ) {
				$font_links = Bsf_Custom_Fonts_Taxonomy::get_font_links( $term->term_id );

				$font_links['font-display'] = str_replace( 'http://', '', $font_links['font-display'] );

				Bsf_Custom_Fonts_Taxonomy::update_font_links( $font_links, $term->term_id );
			}
		}

	}

	/**
	 * Check if db upgrade is required.
	 *
	 * @since 1.2.5
	 * @return true|false True if stored database version is lower than constant; false if otherwise.
	 */
	private function needs_db_update() {
		$db_version = get_option( $this->db_version_key, false );

		if ( false === $db_version || version_compare( $db_version, BSF_CUSTOM_FONTS_VER, '!=' ) ) {
			return true;
		}

		return false;
	}

	/**
	 * Update DB version.
	 *
	 * @since 1.2.5
	 * @return void
	 */
	private function update_db_version() {
		update_option( '_custom_fonts_db_version', BSF_CUSTOM_FONTS_VER );
	}

}
Custom_Fonts_Update::get_instance();
