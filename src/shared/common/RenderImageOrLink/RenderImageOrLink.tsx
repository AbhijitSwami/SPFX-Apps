import * as React from 'react';
import { isImageUrl, isNullOrUndefined } from '../../../shared/utilities/utilities';
import { Link } from '@material-ui/core';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import styles from '../ExportListItemsToCSV/ExportListItemsToCSV.module.scss';

interface IImageOrLinkProps {
    url: string;
    description: string;
}

export function RenderImageOrLink(props: IImageOrLinkProps) {
    const [isImage, setIsImage] = React.useState<boolean | undefined>(undefined);
    const [loading, setLoading] = React.useState<boolean>(true);
    const { url, description } = props;

    React.useEffect(() => {
        const checkIfImage = async () => {
            setLoading(true);
            try {
                console.log("Checking if URL is an image:", url);
                const response = await isImageUrl(url);
                setIsImage(response);
                console.log("Is Image:", response);
            } catch (error) {
                console.error("Error determining if URL is an image:", error);
                setIsImage(false); // Assume it's a link if an error occurs
            } finally {
                setLoading(false);
            }
        };

        checkIfImage();
    }, [url]);

    return (
        <>
            {loading ? (
                <span>Loading...</span> // Show a loading indicator
            ) : !isNullOrUndefined(isImage) && isImage ? (
                <Image
                    src={url}
                    alt={description}
                    height={50}
                    width={50}
                    onClick={() => window.location.href = url}
                    imageFit={ImageFit.cover}
                    className={styles.image}
                />
            ) : (
                <Link href={url} target="_blank" className={styles.link}>
                    {description}
                </Link>
            )}
        </>
    );
}
