import React, { MouseEvent, FunctionComponent, useEffect, useState } from 'react';
import styles from './index.module.scss'

type Bundle = {
    handle: string
    imageSrc: string
    originalPrice: number
    price: number
    products_included: string[]
    tags: string[]
    title: string
}

const BundleCollection: FunctionComponent = () => {
    const [ bundles, setBundles ] = useState<Bundle[]>([])
    const [ loading, setLoading ] = useState(false)
    const [ filteredBundles, setFilteredBundles ] = useState(bundles)

// Fetch data on initial component load.
    useEffect(() => {
        try {
            const fetchData = async () => {
                const response = await fetch('https://ae3t7l1i79.execute-api.us-east-1.amazonaws.com/bundles');
                const data = await response.json();

                // API does not return bundle tags, so we add them here.
                const bundlesWithTagsAdded = data.map((bundle: Bundle) => {
                    if (bundle.handle === 'bun-top-squatch') {
                        bundle.tags = ['woodsy', 'citrus']
                    } else if (bundle.handle === 'bun-shower-essentials') {
                        bundle.tags = ['woodsy', 'citrus', 'herbal']
                    } else if (bundle.handle === 'bun-clean-fresh') {
                        bundle.tags = ['woodsy', 'fresh']
                    } else if (bundle.handle === 'bun-deo-soap-set') {
                        bundle.tags = ['woodsy', 'citrus', 'rich', 'spiced', 'herbal']
                    }
                    return bundle
                })
                setBundles(bundlesWithTagsAdded)
                setFilteredBundles(bundlesWithTagsAdded)
                setLoading(true)
            }
            fetchData();
        } catch(err) {
            console.error(err)
        }
    }, [])

    const getTagColor = (tag: string) => {
        // Take in the tag name and return the background color.
        switch(tag) {
            case 'woodsy':
                return '#165834'
                break;
            case 'citrus':
                return '#de7c00'
                break;
            case 'fresh':
                return '#006fd6'
                break;
            case 'herbal':
                return '#5a3714'
                break;
            case 'rich':
                return '#e0a17e'
                break;
            case 'spiced':
                return '#c10000'
                break;
            default: return '#165834'
        }
    }

    const scentTags = ['woodsy', 'citrus', 'fresh', 'herbal', 'rich', 'spiced']

    // Sort bundles by scent tag when tag is clicked.
    const handleSelect = (e: MouseEvent<HTMLSpanElement>) => {
        const filterBund = bundles.filter(item => item.tags.includes(e.target.dataset.tag))
        setFilteredBundles(filterBund)
    }

    return !loading ? (
        // Show a loading screen while the data is fetching.
        <div>
            ...loading
        </div>
    ) : (
        <div className={styles.storefront}>
        <div className={styles.selectSection}>
            <p>Select Scent:</p>
            <div className={styles.tagRow}>
                {scentTags.map((tag, i) => (
                    <span onClick={handleSelect} className={styles.tag} key={i} style={{background: getTagColor(tag)}} data-tag={tag}>{tag}</span>
                ))}
            </div>
        </div>

        <div className={styles.bundleRow}>
            {filteredBundles.map(({imageSrc, originalPrice, price, products_included, tags, title}, i) => {
                const formattedPrice = (price / 100).toFixed(2)
                return (

                    <div key={i} className={styles.bundleCard}>
                        <div className={styles.image}>
                            <img alt={title} src={imageSrc}  />
                        </div>
                        <h3>{title}</h3>
                        <div className={styles.pricing}>
                            {originalPrice ? (<span className={styles.compareAtPrice}>${formattedPrice}</span>) : null}
                            <span>${formattedPrice}</span>
                        </div>
                        <div className={styles.tagRow}>
                            {tags.map((tag, i) => (
                                <span className={styles.tag} key={i} style={{background: getTagColor(tag)}}>{tag}</span>
                            ))}
                        </div>
                        <div className={styles.included}>
                            <span className={styles.heading}>Included</span>
                            {products_included.map((product, i) => (
                                <span key={i} className={styles.product}>{product.replace('-', ' ')},&nbsp;</span>
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default BundleCollection;