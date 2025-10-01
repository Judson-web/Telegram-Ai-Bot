{ pkgs }: {
  deps = [
    pkgs.nodejs-20_x
    pkgs.nodePackages.typescript
    pkgs.nodePackages.ts-node
    pkgs.nodePackages.pm2
  ];
}
