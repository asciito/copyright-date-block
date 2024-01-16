import { useBlockProps } from '@wordpress/block-editor';

/**
 * @typedef {Object} Props
 * @property {Object}  attributes                     The block attributes.
 * @property {boolean} attributes.showStartingYear    Whether to show the starting year.
 * @property {string}  attributes.startingYear        The starting year.
 * @property {number}  attributes.fallbackCurrentYear The fallback current year.
 */

/**
 * The save function for the block.
 *
 * @param {Props} props The props of the block.
 *
 * @return {JSX.Element|null} Element to render, or null to render nothing
 */
export default function Save( { attributes } ) {
	const { showStartingYear, startingYear, fallbackCurrentYear } = attributes;

	if ( ! fallbackCurrentYear ) {
		return null;
	}

	let displayYear;

	if ( showStartingYear && startingYear ) {
		displayYear = `${ startingYear } - ${ fallbackCurrentYear }`;
	} else {
		displayYear = fallbackCurrentYear;
	}

	return <p { ...useBlockProps.save() }>© { displayYear }</p>;
}
