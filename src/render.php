<?php
/**
 * Render code for copyright-date-block
 *
 * @var array $attributes
 * @var string $content
 * @var WP_Block $block
 */

$current_year = date( 'Y' );

// Determine which content to display
if ( isset( $attributes[ 'fallbackCurrentYear' ] ) && $attributes[ 'fallbackCurrentYear' ] === $attributes[ 'currentYear' ] ) {
	// The current year is the same as the fallback, so use the block
	// content saved in the database (by the save.js function).
	$block_content = $content;
} else {
	if ( ! empty( $attributes['startingYear'] ) && ! empty( $attributes['showStartingYear'] ) ) {
		$display_year = $attributes['startingYear'] . ' - ' . $current_year;
	} else {
		$display_year = $current_year;
	}

	$block_content = '<p ' . get_block_wrapper_attributes() . '>© ' . esc_html( $display_year ) . '</p>';
}

echo wp_kses_post( $block_content );
