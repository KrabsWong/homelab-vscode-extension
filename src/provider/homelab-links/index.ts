/* eslint-disable @typescript-eslint/naming-convention */
import { readFile } from 'fs/promises';

import * as vscode from 'vscode';
import YAML from 'yaml';

import config from '@/config';
import { IHomelabLinks } from '@/interface/homelab-links';

class HomelabLinksProvider implements vscode.TreeDataProvider<HomelabLinksProps> {
  // 获取当前插件的配置信息
  get #homelabConfigPath(): {
    links: string | undefined
  } {
    const { section, scope } = config.configuration.homelabLinks;
    const linksPath = vscode.workspace.getConfiguration(section).get(scope) as string | undefined;
    return {
      links: linksPath
    };
  }
  openExternal(element: HomelabLinksProps) {
    vscode.env.openExternal(vscode.Uri.parse(element.url));
  }
  getTreeItem(element: HomelabLinksProps): HomelabLinksProps {
    return element;
  }
  async getChildren(element?: HomelabLinksProps): Promise<HomelabLinksProps[]> {
    const linksData = await this.getLinksFromConfiguration();
    if (!linksData) {
      return Promise.resolve([]);
    }

    const treeViewData = this.buildTreeviewData(linksData);
    if (element) {
      const matchedGroup = treeViewData.filter(item => item.url === element.url);
      return Promise.resolve(matchedGroup?.[0].items ?? []);
    }
    return Promise.resolve(treeViewData);
  }
  /**
   * 获取 homelab 的 links 文件的配置信息，并格式化为 json
  */
  async getLinksFromConfiguration(): Promise<IHomelabLinks | null> {
    const homelabLinksPath = this.#homelabConfigPath.links;
    if (!homelabLinksPath) {
      console.log('You have to set the local path for homelab links file (in yaml format)');
      return null;
    }

    try {
      const homelabLinksBuffer = await readFile(homelabLinksPath);
      const homelabLinksString = Buffer.from(homelabLinksBuffer).toString();
      return YAML.parse(homelabLinksString).Links || null;
    } catch(e) {
      console.log(`file ${homelabLinksPath} doesn't exist, or the data can not be formatted as yaml normally/`);
      return null;
    };
  }
  /**
   * 构造 Treeview 的数据结构
  */
  buildTreeviewData(links: IHomelabLinks): HomelabLinksProps[] {
    const { Base, Sites } = links;
    return Sites.reduce((result: HomelabLinksProps[], siteGroup) => {
      const { group: groupLabel, items: groupItems, description } = siteGroup;
      const subTreeItems = groupItems.reduce(( r: HomelabLinksProps[], groupItem ) => {
        r.push(new HomelabLinksProps(
          groupItem.label,
          vscode.TreeItemCollapsibleState.None,
          buildTreeviewItemUrl(Base, groupItem))
        );
        return r;
      }, []);

      result.push({
        label: groupLabel,
        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
        url: `group://${groupLabel}`,
        items: subTreeItems,
        description,
        contextValue: 'group',
      });
      return result;
    }, []);
  }
}

const buildTreeviewItemUrl = (base: any, item: any) => {
  const { port, protocol, domain } = base;
  const { lx, suffix } = item;
  return `${protocol}//${lx}${domain}:${port}${suffix ? `/${suffix}` : ''}`;
};

class HomelabLinksProps extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly url: string,
    public readonly items?: HomelabLinksProps[],
    public readonly contextValue?: string,
  ) {
    super(label, collapsibleState);
  }
}

export const initialize = async (context: vscode.ExtensionContext) => {
  const homelabLinksProvider = new HomelabLinksProvider();
  context.subscriptions.push(
    vscode.window.registerTreeDataProvider('WooyooHomelabLinksView', homelabLinksProvider),
    vscode.commands.registerCommand('wooyoo.homelab.open', item => homelabLinksProvider.openExternal(item)),
  );
};
