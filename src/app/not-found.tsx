"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex max-w-md flex-col items-center text-center"
            >
                <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
                    <FileQuestion className="h-10 w-10 text-muted-foreground" />
                </div>

                <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
                    404
                </h1>
                <h2 className="mb-4 text-xl font-medium text-muted-foreground">
                    Page not found
                </h2>
                <p className="mb-8 text-sm text-muted-foreground/80 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                <Link href="/">
                    <Button className="gap-2" size="lg">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
            </motion.div>
        </div>
    );
}
