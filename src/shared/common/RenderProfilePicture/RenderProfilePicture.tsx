import * as React from 'react';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';

interface IProfilePicProps {
    loginName: string;
    displayName: string;
    getUserProfileUrl: () => Promise<string>;
}

export function RenderProfilePicture(props: IProfilePicProps) {
    const [profileUrl, setProfileUrl] = React.useState<string | undefined>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const { displayName, getUserProfileUrl } = props;

    React.useEffect(() => {
        const fetchProfileUrl = async () => {
            setLoading(true);
            try {
                console.log("Fetching profile URL...");
                const url = await getUserProfileUrl();
                if (!url) {
                    console.warn("Profile URL is empty or undefined.");
                }
                setProfileUrl(url);
            } catch (error) {
                console.error("Failed to fetch profile URL:", error);
                setProfileUrl(undefined); // Fallback to undefined for default image
            } finally {
                setLoading(false);
            }
        };

        fetchProfileUrl();
    }, [getUserProfileUrl]);

    return (
        <Persona
            imageUrl={
                profileUrl || 'https://via.placeholder.com/32'
            } // Fallback image
            text={loading ? 'Loading...' : displayName}
            size={PersonaSize.size32}
            imageAlt={displayName}
            styles={{
                primaryText: { fontSize: '12px' },
            }}
        />
    );
}
