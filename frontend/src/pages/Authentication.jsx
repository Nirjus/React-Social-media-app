import FloatingShaps from "@/components/shapes/FloatingShaps";

const AuthenticationLayout = () => (WrapedLayout) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-sky-800 to-gray-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShaps
          color={"bg-sky-500"}
          size={"w-64 h-64"}
          top={"-5%"}
          left={"10%"}
          delay={0}
        />
        <FloatingShaps
          color={"bg-sky-800"}
          size={"w-48 h-48"}
          top={"70%"}
          left={"80%"}
          delay={5}
        />
        <FloatingShaps
          color={"bg-sky-500"}
          size={"w-32 h-32"}
          top={"40%"}
          left={"10%"}
          delay={2}
        />
        <WrapedLayout {...props} />
      </div>
    );
  };
};

export default AuthenticationLayout;
