/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect } from 'react';

/**
 * @typedef  {Object}  Props
 * @property {Object}  attributes                     The block attributes.
 * @property {boolean} attributes.showStartingYear    Whether to show the starting year.
 * @property {string}  attributes.startingYear        The starting year.
 * @property {number}  attributes.fallbackCurrentYear The fallback current year.
 */

/**
 * The edit function describes the structure of your block in the context of the
 *
 * @param {Props} props The props of the block.
 *
 * @return {JSX.Element} 		Element to render
 */
export default function Edit( { attributes, setAttributes } ) {
	const currentYear = new Date().getFullYear();
	const { showStartingYear, startingYear, fallbackCurrentYear } = attributes;

	useEffect( () => {
		if ( ! ( currentYear !== fallbackCurrentYear ) ) {
			setAttributes( { fallbackCurrentYear: currentYear } );
		}
	}, [ currentYear, fallbackCurrentYear, setAttributes ] );

	let displayYear;

	if ( showStartingYear && startingYear ) {
		displayYear = `${ startingYear } - ${ currentYear }`;
	} else {
		displayYear = currentYear;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'copyright-date-block' ) }>
					<ToggleControl
						label={ __(
							'Show starting year',
							'copyright-date-block'
						) }
						checked={ showStartingYear }
						onChange={ () =>
							setAttributes( {
								showStartingYear: ! showStartingYear,
							} )
						}
					/>
					{ showStartingYear && (
						<TextControl
							label={ __(
								'Starting year',
								'copyright-date-block'
							) }
							value={ startingYear || '' }
							onChange={ ( value ) =>
								setAttributes( { startingYear: value } )
							}
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<p { ...useBlockProps() }>© { displayYear }</p>
		</>
	);
}
