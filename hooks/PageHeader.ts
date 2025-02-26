'use client'


import { useEffect } from "react";
import { useRouter } from "next/router";
import { PageTitle } from "@/utils/PageTitle";

const PageHeader = () => {
    const router = useRouter();

    useEffect(() => {
        document.title = PageTitle(router.pathname);
    }, [router.pathname]);

    return null; // Since this component doesn't render anything
}

export default PageHeader;
