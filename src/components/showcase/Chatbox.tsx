'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { useTranslations } from 'next-intl';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.75 13.96c-.25-.13-1.48-.73-1.71-.82-.23-.08-.39-.13-.56.13-.17.25-.65.81-.79.98-.14.17-.29.18-.54.06-.25-.11-1.04-.38-1.99-1.22-.74-.66-1.23-1.46-1.38-1.71-.15-.25-.01-.39.11-.5.11-.11.25-.29.38-.43.12-.14.16-.25.25-.42.09-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.42h-.5c-.17 0-.42.06-.64.33-.22.27-.85.83-.85 2.01 0 1.18.87 2.33 1 2.51.13.17 1.71 2.63 4.17 3.66.58.25 1.03.4 1.39.51.54.17 1.01.14 1.38.08.42-.06 1.28-.52 1.46-1.03.18-.51.18-.94.12-1.04-.06-.1-.22-.15-.47-.28zM12.04 2.02c-5.46 0-9.91 4.45-9.91 9.91 0 1.79.46 3.5 1.28 5l-1.36 4.95 5.07-1.33c1.44.8 3.06 1.24 4.75 1.24h.01c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zM19.12 17.3c-1.89 1.89-4.4 2.93-7.08 2.93h-.01c-1.57 0-3.11-.42-4.45-1.21l-.31-.18-3.32.87.89-3.23-.2-.33c-.88-1.45-1.35-3.12-1.35-4.85 0-4.91 3.99-8.91 8.91-8.91 2.41 0 4.67.94 6.3 2.58s2.58 3.89 2.58 6.3c0 4.91-3.99 8.91-8.91 8.91z"
      />
    </svg>
  );

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'agent';
};

export function Chatbox() {
  const t = useTranslations('Chatbox');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t('greeting'),
      sender: 'agent',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputValue,
        sender: 'user',
      };
      
      const phoneNumber = "905368338429";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        inputValue
      )}`;
      
      window.open(whatsappUrl, '_blank');

      const agentResponse: Message = {
          id: Date.now() + 1,
          text: t('whatsappRedirect'),
          sender: 'agent',
      };

      setMessages([...messages, userMessage, agentResponse]);
      setInputValue('');
    }
  };
  
    useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                className="rounded-full w-auto h-auto p-4 shadow-xl"
                onClick={() => setIsOpen(true)}
              >
                <WhatsAppIcon className="h-9 w-9" />
                <span className="ml-3 text-lg font-semibold">{t('prompt')}</span>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-full max-w-sm"
          >
            <Card className="shadow-2xl rounded-xl border-none flex flex-col h-[60vh]">
              <CardHeader className="flex flex-row items-center justify-between bg-primary text-primary-foreground p-4 rounded-t-xl">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">KF</AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-headline text-xl">Kermit Floor Support</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/80" onClick={() => setIsOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-4 bg-background overflow-y-auto">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-2 ${
                          message.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        {message.sender === 'agent' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">KF</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t bg-background rounded-b-xl">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={t('placeholder')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="bg-card"
                  />
                  <Button type="submit" size="icon" onClick={handleSendMessage}>
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
